import { createBrowserClient } from '@supabase/ssr';
import type { Database } from '@/types/database.types';
import { getSanitizedSupabaseUrl, getSanitizedSupabaseKey } from './config';

export function createClient() {
  const supabaseUrl = getSanitizedSupabaseUrl();
  const supabaseKey = getSanitizedSupabaseKey();

  return createBrowserClient<Database>(
    supabaseUrl,
    supabaseKey
  );
}

