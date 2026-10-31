import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { resetPasswordRequestAction, updatePasswordAction } from '@/features/authentication/actions';

const mockResetPasswordForEmail = vi.fn();
const mockUpdateUser = vi.fn();

vi.mock('@/lib/supabase/server', () => ({
  createClient: vi.fn().mockResolvedValue({
    auth: {
      resetPasswordForEmail: (email: string, options: unknown) =>
        mockResetPasswordForEmail(email, options),
      updateUser: (attrs: unknown) => mockUpdateUser(attrs),
    },
  }),
}));

vi.mock('next/cache', () => ({
  revalidatePath: vi.fn(),
}));

describe('Password Reset Actions', () => {
  const originalEnv = process.env.ADMIN_EMAIL_ALLOWLIST;

  beforeEach(() => {
    vi.clearAllMocks();
    process.env.ADMIN_EMAIL_ALLOWLIST = 'azaki5030@gmail.com';
  });

  afterEach(() => {
    process.env.ADMIN_EMAIL_ALLOWLIST = originalEnv;
  });

  it('rejects empty email', async () => {
    const result = await resetPasswordRequestAction('');
    expect(result.success).toBe(false);
    expect(result.error).toContain('يرجى إدخال البريد');
  });

  it('rejects email not in allowlist', async () => {
    const result = await resetPasswordRequestAction('hacker@example.com');
    expect(result.success).toBe(false);
    expect(result.error).toContain('غير مسجل');
  });

  it('sends reset link for authorized admin email', async () => {
    mockResetPasswordForEmail.mockResolvedValueOnce({ error: null });

    const result = await resetPasswordRequestAction('azaki5030@gmail.com');
    expect(result.success).toBe(true);
    expect(mockResetPasswordForEmail).toHaveBeenCalledWith(
      'azaki5030@gmail.com',
      expect.objectContaining({
        redirectTo: expect.stringContaining('/auth/callback?next=/admin/reset-password'),
      })
    );
  });

  it('rejects short passwords in updatePasswordAction', async () => {
    const result = await updatePasswordAction('123');
    expect(result.success).toBe(false);
    expect(result.error).toContain('6 أحرف');
  });

  it('successfully updates password with valid input', async () => {
    mockUpdateUser.mockResolvedValueOnce({ error: null });

    const result = await updatePasswordAction('StrongNewPassword123');
    expect(result.success).toBe(true);
    expect(mockUpdateUser).toHaveBeenCalledWith({
      password: 'StrongNewPassword123',
    });
  });
});
