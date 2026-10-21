import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { requireAdmin, isAdmin } from '@/lib/auth/admin';

// Mock Supabase server client
const mockGetUser = vi.fn();
vi.mock('@/lib/supabase/server', () => ({
  createClient: vi.fn().mockResolvedValue({
    auth: {
      getUser: () => mockGetUser(),
    },
  }),
}));

describe('Admin Authorization (requireAdmin & isAdmin)', () => {
  const originalEnv = process.env.ADMIN_EMAIL_ALLOWLIST;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    process.env.ADMIN_EMAIL_ALLOWLIST = originalEnv;
  });

  it('throws when user is not authenticated', async () => {
    mockGetUser.mockResolvedValueOnce({ data: { user: null }, error: new Error('No session') });

    await expect(requireAdmin()).rejects.toThrow('Authentication required');
  });

  it('throws when user email is not in the allowlist', async () => {
    process.env.ADMIN_EMAIL_ALLOWLIST = 'admin@example.com, owner@example.com';
    mockGetUser.mockResolvedValueOnce({
      data: { user: { id: 'u123', email: 'stranger@example.com' } },
      error: null,
    });

    await expect(requireAdmin()).rejects.toThrow('Unauthorized: Admin access required');
  });

  it('authorizes user when email matches allowlist (case-insensitive and trimmed)', async () => {
    process.env.ADMIN_EMAIL_ALLOWLIST = '  admin@example.com , owner@example.com ';
    mockGetUser.mockResolvedValueOnce({
      data: { user: { id: 'u123', email: 'ADMIN@EXAMPLE.COM' } },
      error: null,
    });

    const result = await requireAdmin();
    expect(result.user.email).toBe('ADMIN@EXAMPLE.COM');
  });

  it('authorizes any authenticated user if allowlist is empty', async () => {
    delete process.env.ADMIN_EMAIL_ALLOWLIST;
    mockGetUser.mockResolvedValueOnce({
      data: { user: { id: 'u123', email: 'user@example.com' } },
      error: null,
    });

    const result = await requireAdmin();
    expect(result.user.id).toBe('u123');
  });

  it('isAdmin returns false for unauthenticated requests', async () => {
    mockGetUser.mockResolvedValueOnce({ data: { user: null }, error: null });

    const authorized = await isAdmin();
    expect(authorized).toBe(false);
  });

  it('isAdmin returns true for authorized requests', async () => {
    process.env.ADMIN_EMAIL_ALLOWLIST = 'admin@example.com';
    mockGetUser.mockResolvedValueOnce({
      data: { user: { id: 'u123', email: 'admin@example.com' } },
      error: null,
    });

    const authorized = await isAdmin();
    expect(authorized).toBe(true);
  });
});
