'use server';

import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/auth/admin';
import { skillFormSchema } from '@/features/skills/schemas';
import type { ActionResult } from '@/features/projects/actions';

export async function createSkill(formData: unknown): Promise<ActionResult> {
  try {
    const { supabase } = await requireAdmin();

    const parsed = skillFormSchema.safeParse(formData);
    if (!parsed.success) {
      return { success: false, error: parsed.error.errors[0]?.message || 'Validation failed' };
    }

    const { error } = await supabase
      .from('skills')
      .insert(parsed.data);

    if (error) {
      console.error('Error creating skill:', error);
      return { success: false, error: 'Failed to create skill' };
    }

    revalidatePath('/');
    revalidatePath('/admin/skills');

    return { success: true };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'An unexpected error occurred';
    return { success: false, error: message };
  }
}

export async function updateSkill(id: string, formData: unknown): Promise<ActionResult> {
  try {
    const { supabase } = await requireAdmin();

    if (!id || typeof id !== 'string') {
      return { success: false, error: 'Invalid skill ID' };
    }

    const parsed = skillFormSchema.safeParse(formData);
    if (!parsed.success) {
      return { success: false, error: parsed.error.errors[0]?.message || 'Validation failed' };
    }

    const { error } = await supabase
      .from('skills')
      .update(parsed.data)
      .eq('id', id);

    if (error) {
      console.error('Error updating skill:', error);
      return { success: false, error: 'Failed to update skill' };
    }

    revalidatePath('/');
    revalidatePath('/admin/skills');

    return { success: true };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'An unexpected error occurred';
    return { success: false, error: message };
  }
}

export async function deleteSkill(id: string): Promise<ActionResult> {
  try {
    const { supabase } = await requireAdmin();

    if (!id || typeof id !== 'string') {
      return { success: false, error: 'Invalid skill ID' };
    }

    const { error } = await supabase
      .from('skills')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting skill:', error);
      return { success: false, error: 'Failed to delete skill' };
    }

    revalidatePath('/');
    revalidatePath('/admin/skills');

    return { success: true };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'An unexpected error occurred';
    return { success: false, error: message };
  }
}

export async function toggleSkillVisibility(id: string): Promise<ActionResult> {
  try {
    const { supabase } = await requireAdmin();

    const { data: skill, error: fetchError } = await supabase
      .from('skills')
      .select('is_visible')
      .eq('id', id)
      .single();

    if (fetchError || !skill) {
      return { success: false, error: 'Skill not found' };
    }

    const { error } = await supabase
      .from('skills')
      .update({ is_visible: !skill.is_visible })
      .eq('id', id);

    if (error) {
      return { success: false, error: 'Failed to toggle skill visibility' };
    }

    revalidatePath('/');
    revalidatePath('/admin/skills');

    return { success: true };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'An unexpected error occurred';
    return { success: false, error: message };
  }
}
