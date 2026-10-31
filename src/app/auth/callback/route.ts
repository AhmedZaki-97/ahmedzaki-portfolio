import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/admin/reset-password';

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // Return to admin login with error message if exchange fails
  return NextResponse.redirect(
    `${origin}/admin/login?error=${encodeURIComponent(
      'انتهت صلاحية الرابط أو تم استخدامه من قبل. يرجى طلب رابط جديد.'
    )}`
  );
}
