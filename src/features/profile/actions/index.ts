'use server';

import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/auth/admin';
import { profileSettingsSchema } from '@/features/profile/schemas';
import type { ActionResult } from '@/features/projects/actions';

export async function updateProfileSettings(formData: unknown): Promise<ActionResult> {
  try {
    const { supabase } = await requireAdmin();

    const parsed = profileSettingsSchema.safeParse(formData);
    if (!parsed.success) {
      return { success: false, error: parsed.error.errors[0]?.message || 'Validation failed' };
    }

    // Check if profile exists
    const { data: existing } = await supabase
      .from('profile_settings')
      .select('id')
      .limit(1)
      .single();

    if (existing) {
      // Update existing profile
      const { error } = await supabase
        .from('profile_settings')
        .update(parsed.data)
        .eq('id', existing.id);

      if (error) {
        console.error('Error updating profile:', error);
        return { success: false, error: 'Failed to update profile settings' };
      }
    } else {
      // Create new profile
      const { error } = await supabase
        .from('profile_settings')
        .insert(parsed.data);

      if (error) {
        console.error('Error creating profile:', error);
        return { success: false, error: 'Failed to create profile settings' };
      }
    }

    // Revalidate all public pages that use profile data
    revalidatePath('/');
    revalidatePath('/about');
    revalidatePath('/contact');
    revalidatePath('/admin/settings');

    return { success: true };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'An unexpected error occurred';
    return { success: false, error: message };
  }
}

export async function updateProfileImage(imagePath: string | null): Promise<ActionResult> {
  try {
    const { supabase } = await requireAdmin();

    const { data: existing } = await supabase
      .from('profile_settings')
      .select('id')
      .limit(1)
      .single();

    if (!existing) {
      return { success: false, error: 'Profile not found' };
    }

    const { error } = await supabase
      .from('profile_settings')
      .update({ profile_image_path: imagePath })
      .eq('id', existing.id);

    if (error) {
      return { success: false, error: 'Failed to update profile image' };
    }

    revalidatePath('/');
    revalidatePath('/about');
    revalidatePath('/admin/settings');

    return { success: true };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'An unexpected error occurred';
    return { success: false, error: message };
  }
}
