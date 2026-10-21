import { createClient } from '@/lib/supabase/server';
import type { Project } from '@/types';

export async function getPublishedProjects({
  search,
  category,
  limit,
  offset = 0,
}: {
  search?: string;
  category?: string;
  limit?: number;
  offset?: number;
} = {}): Promise<{ projects: Project[]; count: number }> {
  try {
    const supabase = await createClient();

    let query = supabase
      .from('projects')
      .select('*', { count: 'exact' })
      .eq('status', 'published')
      .order('display_order', { ascending: true })
      .order('created_at', { ascending: false });

    if (search) {
      query = query.or(`title.ilike.%${search}%,short_description.ilike.%${search}%`);
    }

    if (category && category !== 'All') {
      query = query.eq('category', category);
    }

    if (limit) {
      query = query.range(offset, offset + limit - 1);
    }

    const { data, error, count } = await query;

    if (error) {
      console.error('Error fetching published projects:', error);
      return { projects: [], count: 0 };
    }

    return { projects: (data as Project[]) || [], count: count || 0 };
  } catch (error) {
    console.warn('Projects fetch skipped (Supabase client not initialized):', error);
    return { projects: [], count: 0 };
  }
}

export async function getFeaturedProjects(): Promise<Project[]> {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('status', 'published')
      .eq('is_featured', true)
      .order('display_order', { ascending: true })
      .limit(6);

    if (error) {
      console.error('Error fetching featured projects:', error);
      return [];
    }

    return (data as Project[]) || [];
  } catch (error) {
    console.warn('Featured projects fetch skipped (Supabase client not initialized):', error);
    return [];
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single();

  if (error) {
    return null;
  }

  return data as Project;
}

export async function getProjectById(id: string): Promise<Project | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    return null;
  }

  return data as Project;
}

export async function getAllProjects(): Promise<Project[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('display_order', { ascending: true })
    .order('updated_at', { ascending: false });

  if (error) {
    console.error('Error fetching all projects:', error);
    return [];
  }

  return (data as Project[]) || [];
}

export async function getRelatedProjects(currentSlug: string, category: string, limit = 3): Promise<Project[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('status', 'published')
    .eq('category', category)
    .neq('slug', currentSlug)
    .order('display_order', { ascending: true })
    .limit(limit);

  if (error) {
    console.error('Error fetching related projects:', error);
    return [];
  }

  return (data as Project[]) || [];
}

export async function getProjectStats() {
  const supabase = await createClient();

  const { data: allProjects, error } = await supabase
    .from('projects')
    .select('id, status, is_featured, updated_at');

  if (error) {
    console.error('Error fetching project stats:', error);
    return {
      total: 0,
      published: 0,
      draft: 0,
      featured: 0,
    };
  }

  const projects = allProjects || [];
  return {
    total: projects.length,
    published: projects.filter(p => p.status === 'published').length,
    draft: projects.filter(p => p.status === 'draft').length,
    featured: projects.filter(p => p.is_featured).length,
  };
}

export async function getProjectCategories(): Promise<string[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('projects')
    .select('category')
    .eq('status', 'published');

  if (error) {
    console.error('Error fetching categories:', error);
    return [];
  }

  const categories = [...new Set((data || []).map(p => p.category))];
  return categories.sort();
}

export async function checkSlugExists(slug: string, excludeId?: string): Promise<boolean> {
  const supabase = await createClient();

  let query = supabase
    .from('projects')
    .select('id')
    .eq('slug', slug);

  if (excludeId) {
    query = query.neq('id', excludeId);
  }

  const { data } = await query;
  return (data?.length ?? 0) > 0;
}
