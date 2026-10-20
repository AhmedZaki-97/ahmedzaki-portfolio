import { createClient } from '@/lib/supabase/server';

const getAdminEmails = (): string[] => {
  const allowlist = process.env.ADMIN_EMAIL_ALLOWLIST || '';
  return allowlist
    .split(',')
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
};

/**
 * Verifies that the current user is authenticated AND authorized as an admin.
 * Call this at the beginning of every admin Server Action or Route Handler.
 */
export async function requireAdmin() {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    throw new Error('Authentication required');
  }

  const adminEmails = getAdminEmails();
  if (adminEmails.length > 0 && !adminEmails.includes(user.email?.toLowerCase() || '')) {
    throw new Error('Unauthorized: Admin access required');
  }

  return { user, supabase };
}

/**
 * Check if the current user is an authenticated admin.
 * Non-throwing version for UI decisions.
 */
export async function isAdmin(): Promise<boolean> {
  try {
    await requireAdmin();
    return true;
  } catch {
    return false;
  }
}
