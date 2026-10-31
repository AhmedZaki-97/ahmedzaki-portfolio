'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

export async function loginAction(formData: { email: string; password: string }) {
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email: formData.email,
    password: formData.password,
  });

  if (error) {
    return { success: false, error: error.message || 'Invalid email or password. Please try again.' };
  }

  // Check admin allowlist
  const adminEmails = (process.env.ADMIN_EMAIL_ALLOWLIST || '')
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);

  if (
    adminEmails.length > 0 &&
    !adminEmails.includes(formData.email.trim().toLowerCase())
  ) {
    await supabase.auth.signOut();
    return {
      success: false,
      error: `تم تسجيل الدخول لكن البريد (${formData.email}) غير مضاف في قائمة المشرفين ADMIN_EMAIL_ALLOWLIST داخل ملف .env.local`,
    };
  }

  revalidatePath('/admin', 'layout');
  redirect('/admin/dashboard');
}

export async function logoutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath('/', 'layout');
  redirect('/admin/login');
}

export async function resetPasswordRequestAction(email: string) {
  const trimmedEmail = email.trim().toLowerCase();
  if (!trimmedEmail) {
    return { success: false, error: 'يرجى إدخال البريد الإلكتروني.' };
  }

  // Check admin allowlist
  const adminEmails = (process.env.ADMIN_EMAIL_ALLOWLIST || '')
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);

  if (adminEmails.length > 0 && !adminEmails.includes(trimmedEmail)) {
    return {
      success: false,
      error: `البريد (${trimmedEmail}) غير مسجل ضمن قائمة المشرفين المصرح لهم ADMIN_EMAIL_ALLOWLIST.`,
    };
  }

  const supabase = await createClient();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const redirectTo = `${siteUrl}/auth/callback?next=/admin/reset-password`;

  const { error } = await supabase.auth.resetPasswordForEmail(trimmedEmail, {
    redirectTo,
  });

  if (error) {
    return { success: false, error: error.message };
  }

  return {
    success: true,
    message: 'تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني (Gmail) بنجاح. يرجى تفقد صندوق الوارد أو مجلد الرسائل غير المرغوب فيها (Spam).',
  };
}

export async function updatePasswordAction(newPassword: string) {
  if (!newPassword || newPassword.length < 6) {
    return { success: false, error: 'يجب أن لا تقل كلمة المرور عن 6 أحرف.' };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath('/admin', 'layout');
  return { success: true };
}

