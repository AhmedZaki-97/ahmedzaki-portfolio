/**
 * Helper to ensure Supabase URL and Keys are cleanly formatted,
 * preventing PGRST125 "Invalid path specified in request URL" errors
 * caused by accidental trailing slashes, quotes, or path fragments.
 */
export function getSanitizedSupabaseUrl(): string {
  const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  return rawUrl
    .trim()
    .replace(/^["']|["']$/g, '')
    .replace(/\/+$/, '')
    .replace(/\/rest\/v1\/?$/, '')
    .replace(/\/+$/, '');
}

export function getSanitizedSupabaseKey(): string {
  const rawKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    '';
  return rawKey.trim().replace(/^["']|["']$/g, '');
}

export function getSanitizedServiceRoleKey(): string {
  const rawKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
  return rawKey.trim().replace(/^["']|["']$/g, '');
}
