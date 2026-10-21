'use server';

import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/auth/admin';
import { projectFormSchema } from '@/features/projects/schemas';
import { checkSlugExists } from '@/features/projects/services';
import type { Database } from '@/types/database.types';

type ProjectUpdate = Database['public']['Tables']['projects']['Update'];

export type ActionResult = {
  success: boolean;
  error?: string;
  data?: Record<string, unknown>;
};

export async function createProject(formData: unknown): Promise<ActionResult> {
  try {
    const { supabase } = await requireAdmin();

    const parsed = projectFormSchema.safeParse(formData);
    if (!parsed.success) {
      return { success: false, error: parsed.error.errors[0]?.message || 'Validation failed' };
    }

    const data = parsed.data;

    // Check for slug conflicts
    const slugExists = await checkSlugExists(data.slug);
    if (slugExists) {
      return { success: false, error: 'A project with this slug already exists. Please choose a different slug.' };
    }

    const projectData = {
      ...data,
      published_at: data.status === 'published' ? new Date().toISOString() : null,
    };

    const { data: project, error } = await supabase
      .from('projects')
      .insert(projectData)
      .select()
      .single();

    if (error) {
      console.error('Error creating project:', error);
      return { success: false, error: 'Failed to create project. Please try again.' };
    }

    revalidatePath('/');
    revalidatePath('/projects');
    revalidatePath('/admin/projects');
    revalidatePath('/admin/dashboard');

    return { success: true, data: { id: project.id, slug: project.slug } };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'An unexpected error occurred';
    return { success: false, error: message };
  }
}

export async function updateProject(id: string, formData: unknown): Promise<ActionResult> {
  try {
    const { supabase } = await requireAdmin();

    if (!id || typeof id !== 'string') {
      return { success: false, error: 'Invalid project ID' };
    }

    const parsed = projectFormSchema.safeParse(formData);
    if (!parsed.success) {
      return { success: false, error: parsed.error.errors[0]?.message || 'Validation failed' };
    }

    const data = parsed.data;

    // Check for slug conflicts (excluding current project)
    const slugExists = await checkSlugExists(data.slug, id);
    if (slugExists) {
      return { success: false, error: 'A project with this slug already exists. Please choose a different slug.' };
    }

    // Get current project to check for slug changes
    const { data: currentProject } = await supabase
      .from('projects')
      .select('slug, status')
      .eq('id', id)
      .single();

    const oldSlug = currentProject?.slug;

    const projectData = {
      ...data,
      published_at: data.status === 'published' && currentProject?.status !== 'published'
        ? new Date().toISOString()
        : undefined,
    };

    // Remove undefined values
    const cleanData = Object.fromEntries(
      Object.entries(projectData).filter(([, v]) => v !== undefined)
    );

    const { error } = await supabase
      .from('projects')
      .update(cleanData as ProjectUpdate)
      .eq('id', id);

    if (error) {
      console.error('Error updating project:', error);
      return { success: false, error: 'Failed to update project. Please try again.' };
    }

    // Revalidate paths
    revalidatePath('/');
    revalidatePath('/projects');
    revalidatePath(`/projects/${data.slug}`);
    revalidatePath('/admin/projects');
    revalidatePath('/admin/dashboard');

    // If slug changed, revalidate old slug path too
    if (oldSlug && oldSlug !== data.slug) {
      revalidatePath(`/projects/${oldSlug}`);
    }

    return { success: true, data: { id, slug: data.slug } };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'An unexpected error occurred';
    return { success: false, error: message };
  }
}

export async function deleteProject(id: string): Promise<ActionResult> {
  try {
    const { supabase } = await requireAdmin();

    if (!id || typeof id !== 'string') {
      return { success: false, error: 'Invalid project ID' };
    }

    // Get project info for cache invalidation and storage cleanup
    const { data: project, error: fetchError } = await supabase
      .from('projects')
      .select('slug, thumbnail_path, gallery_paths')
      .eq('id', id)
      .single();

    if (fetchError || !project) {
      return { success: false, error: 'Project not found' };
    }

    // Delete the project from the database first
    const { error: deleteError } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);

    if (deleteError) {
      console.error('Error deleting project:', deleteError);
      return { success: false, error: 'Failed to delete project. Please try again.' };
    }

    // Clean up storage assets (best effort - don't fail if storage cleanup fails)
    const pathsToDelete: string[] = [];
    if (project.thumbnail_path) {
      pathsToDelete.push(project.thumbnail_path);
    }
    if (project.gallery_paths && project.gallery_paths.length > 0) {
      pathsToDelete.push(...project.gallery_paths);
    }

    if (pathsToDelete.length > 0) {
      const { error: storageError } = await supabase.storage
        .from('portfolio-assets')
        .remove(pathsToDelete);

      if (storageError) {
        console.error('Warning: Failed to clean up storage assets:', storageError);
        // Don't fail the operation - the project is already deleted
      }
    }

    // Revalidate paths
    revalidatePath('/');
    revalidatePath('/projects');
    revalidatePath(`/projects/${project.slug}`);
    revalidatePath('/admin/projects');
    revalidatePath('/admin/dashboard');

    return { success: true };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'An unexpected error occurred';
    return { success: false, error: message };
  }
}

export async function toggleProjectStatus(id: string): Promise<ActionResult> {
  try {
    const { supabase } = await requireAdmin();

    const { data: project, error: fetchError } = await supabase
      .from('projects')
      .select('status, slug')
      .eq('id', id)
      .single();

    if (fetchError || !project) {
      return { success: false, error: 'Project not found' };
    }

    const newStatus = project.status === 'published' ? 'draft' : 'published';
    const updateData: Record<string, unknown> = { status: newStatus };

    if (newStatus === 'published') {
      updateData.published_at = new Date().toISOString();
    }

    const { error } = await supabase
      .from('projects')
      .update(updateData as ProjectUpdate)
      .eq('id', id);

    if (error) {
      return { success: false, error: 'Failed to update project status' };
    }

    revalidatePath('/');
    revalidatePath('/projects');
    revalidatePath(`/projects/${project.slug}`);
    revalidatePath('/admin/projects');
    revalidatePath('/admin/dashboard');

    return { success: true, data: { status: newStatus } };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'An unexpected error occurred';
    return { success: false, error: message };
  }
}

export async function toggleProjectFeatured(id: string): Promise<ActionResult> {
  try {
    const { supabase } = await requireAdmin();

    const { data: project, error: fetchError } = await supabase
      .from('projects')
      .select('is_featured, slug')
      .eq('id', id)
      .single();

    if (fetchError || !project) {
      return { success: false, error: 'Project not found' };
    }

    const { error } = await supabase
      .from('projects')
      .update({ is_featured: !project.is_featured })
      .eq('id', id);

    if (error) {
      return { success: false, error: 'Failed to toggle featured status' };
    }

    revalidatePath('/');
    revalidatePath('/projects');
    revalidatePath('/admin/projects');
    revalidatePath('/admin/dashboard');

    return { success: true, data: { is_featured: !project.is_featured } };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'An unexpected error occurred';
    return { success: false, error: message };
  }
}

export async function updateProjectThumbnail(id: string, thumbnailPath: string | null): Promise<ActionResult> {
  try {
    const { supabase } = await requireAdmin();

    const { error } = await supabase
      .from('projects')
      .update({ thumbnail_path: thumbnailPath })
      .eq('id', id);

    if (error) {
      return { success: false, error: 'Failed to update thumbnail' };
    }

    revalidatePath('/');
    revalidatePath('/projects');
    revalidatePath('/admin/projects');

    return { success: true };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'An unexpected error occurred';
    return { success: false, error: message };
  }
}

export async function updateProjectGallery(id: string, galleryPaths: string[]): Promise<ActionResult> {
  try {
    const { supabase } = await requireAdmin();

    const { error } = await supabase
      .from('projects')
      .update({ gallery_paths: galleryPaths })
      .eq('id', id);

    if (error) {
      return { success: false, error: 'Failed to update gallery' };
    }

    revalidatePath('/projects');
    revalidatePath('/admin/projects');

    return { success: true };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'An unexpected error occurred';
    return { success: false, error: message };
  }
}
