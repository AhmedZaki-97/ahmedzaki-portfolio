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
