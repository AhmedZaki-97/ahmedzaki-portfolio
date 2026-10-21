import { createClient } from '@/lib/supabase/server';
import type { ProfileSettings } from '@/types';

export async function getProfileSettings(): Promise<ProfileSettings | null> {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('profile_settings')
      .select('*')
      .limit(1)
      .single();

    if (error) {
      // If no profile exists yet, return defaults
      if (error.code === 'PGRST116') {
        return null;
      }
      console.error('Error fetching profile settings:', error);
      return null;
    }

    return data as ProfileSettings;
  } catch (error) {
    console.warn('Profile settings fetch skipped (Supabase client not initialized):', error);
    return null;
  }
}
