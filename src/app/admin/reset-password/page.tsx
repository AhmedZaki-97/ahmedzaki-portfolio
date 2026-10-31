import type { Metadata } from 'next';
import { ResetPasswordForm } from '@/features/authentication/components/reset-password-form';
import { LanguageToggle } from '@/components/shared/language-toggle';
import { ThemeToggle } from '@/components/shared/theme-toggle';

export const metadata: Metadata = {
  title: 'Reset Password | استعادة كلمة المرور',
  robots: { index: false, follow: false },
};

export default function ResetPasswordPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-background px-4">
      {/* Top action bar */}
      <div className="absolute top-4 end-4 flex items-center gap-2">
        <LanguageToggle />
        <ThemeToggle />
      </div>

      <div className="w-full max-w-sm space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold tracking-tight">
            Admin<span className="text-primary">Panel</span>
          </h1>
          <p className="text-sm text-muted-foreground">
            Set your new admin password
          </p>
        </div>
        <ResetPasswordForm />
      </div>
    </div>
  );
}
