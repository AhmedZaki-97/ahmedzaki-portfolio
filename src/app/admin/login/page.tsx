import { Suspense } from 'react';
import type { Metadata } from 'next';
import { LoginForm } from '@/features/authentication/components/login-form';
import { LanguageToggle } from '@/components/shared/language-toggle';
import { ThemeToggle } from '@/components/shared/theme-toggle';

export const metadata: Metadata = {
  title: 'Admin Login | تسجيل الدخول',
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <div className="relative min-h-screen bg-slate-950">
      {/* Top action bar */}
      <div className="absolute top-4 end-4 z-20 flex items-center gap-2">
        <LanguageToggle />
        <ThemeToggle />
      </div>

      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-500">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
          </div>
        }
      >
        <LoginForm />
      </Suspense>
    </div>
  );
}


