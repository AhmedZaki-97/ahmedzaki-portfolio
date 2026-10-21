import { createClient } from '@/lib/supabase/server';
import type { Skill } from '@/types';

export async function getVisibleSkills(): Promise<Skill[]> {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('skills')
      .select('*')
      .eq('is_visible', true)
      .order('category', { ascending: true })
      .order('display_order', { ascending: true });

    if (error) {
      console.error('Error fetching skills:', error);
      return [];
    }

    return (data as Skill[]) || [];
  } catch (error) {
    console.warn('Skills fetch skipped (Supabase client not initialized):', error);
    return [];
  }
}

export async function getAllSkills(): Promise<Skill[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('skills')
    .select('*')
    .order('category', { ascending: true })
    .order('display_order', { ascending: true });

  if (error) {
    console.error('Error fetching all skills:', error);
    return [];
  }

  return (data as Skill[]) || [];
}

export async function getSkillById(id: string): Promise<Skill | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('skills')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    return null;
  }

  return data as Skill;
}

export async function getSkillCategories(): Promise<string[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('skills')
    .select('category');

  if (error) {
    console.error('Error fetching skill categories:', error);
    return [];
  }

  const categories = [...new Set((data || []).map(s => s.category))];
  return categories.sort();
}
