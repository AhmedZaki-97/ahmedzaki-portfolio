import type { Metadata } from 'next';
import { LoginForm } from '@/features/authentication/components/login-form';

export const metadata: Metadata = {
  title: 'Admin Login',
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold tracking-tight">
            Admin<span className="text-primary">Panel</span>
          </h1>
          <p className="text-sm text-muted-foreground">
            Sign in to manage your portfolio
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
