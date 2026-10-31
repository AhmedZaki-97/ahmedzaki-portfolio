import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database.types';
import { getSanitizedSupabaseUrl, getSanitizedServiceRoleKey } from './config';

/**
 * Creates a Supabase client with service role privileges.
 * ONLY use this for narrowly scoped administrative tasks that
 * cannot be performed with the user's authenticated session.
 * 
 * This client bypasses Row Level Security.
 * NEVER import this in Client Components.
 */
export function createAdminClient() {
  const supabaseUrl = getSanitizedSupabaseUrl();
  const serviceRoleKey = getSanitizedServiceRoleKey();

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error(
      'Missing SUPABASE_SERVICE_ROLE_KEY or NEXT_PUBLIC_SUPABASE_URL environment variable.'
    );
  }


  return createClient<Database>(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
