'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Eye, EyeOff, Loader2, CheckCircle2, ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { updatePasswordAction } from '@/features/authentication/actions';
import { useI18n } from '@/lib/i18n/context';

export function ResetPasswordForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const { isRtl } = useI18n();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!password || !confirmPassword) {
      setError(isRtl ? 'يرجى إدخال كلمة المرور وتأكيدها.' : 'Please enter and confirm your new password.');
      return;
    }

    if (password.length < 6) {
      setError(isRtl ? 'يجب أن لا تقل كلمة المرور عن 6 أحرف.' : 'Password must be at least 6 characters.');
      return;
    }

    if (password !== confirmPassword) {
      setError(isRtl ? 'كلمتا المرور غير متطابقتين.' : 'Passwords do not match.');
      return;
    }

    startTransition(async () => {
      const result = await updatePasswordAction(password);
      if (result && !result.success) {
        setError(result.error || (isRtl ? 'فشل تحديث كلمة المرور' : 'Failed to update password'));
      } else {
        setSuccess(true);
        setTimeout(() => {
          router.push('/admin/dashboard');
        }, 2000);
      }
    });
  }

  if (success) {
    return (
      <Card>
        <CardContent className="pt-6 text-center space-y-4">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <div className="space-y-1">
            <h3 className="font-semibold text-lg">
              {isRtl ? 'تم تحديث كلمة المرور بنجاح!' : 'Password Updated Successfully!'}
            </h3>
            <p className="text-sm text-muted-foreground">
              {isRtl
                ? 'جاري تحويلك إلى لوحة التحكم الآن...'
                : 'Redirecting you to the dashboard...'}
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4 pt-6">
          {error && (
            <div className="rounded-md bg-destructive/10 border border-destructive/20 px-3 py-2 text-sm text-destructive">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="new-password">
              {isRtl ? 'كلمة المرور الجديدة' : 'New Password'}
            </Label>
            <div className="relative">
              <Input
                id="new-password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isPending}
                required
                className={isRtl ? 'pl-10 pr-3' : 'pr-10 pl-3'}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={`absolute ${isRtl ? 'left-3' : 'right-3'} top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground`}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirm-password">
              {isRtl ? 'تأكيد كلمة المرور الجديدة' : 'Confirm New Password'}
            </Label>
            <div className="relative">
              <Input
                id="confirm-password"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={isPending}
                required
                className={isRtl ? 'pl-10 pr-3' : 'pr-10 pl-3'}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className={`absolute ${isRtl ? 'left-3' : 'right-3'} top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground`}
                aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
              >
                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex-col gap-3">
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {isRtl ? 'جاري الحفظ...' : 'Saving...'}
              </>
            ) : isRtl ? (
              'حفظ كلمة المرور الجديدة'
            ) : (
              'Save New Password'
            )}
          </Button>

          <Link
            href="/admin/login"
            className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
          >
            {isRtl ? <ArrowRight className="h-3 w-3" /> : <ArrowLeft className="h-3 w-3" />}
            {isRtl ? 'الرجوع إلى صفحة تسجيل الدخول' : 'Back to login'}
          </Link>
        </CardFooter>
      </form>
    </Card>
  );
}
