'use client';

import { useState, useTransition, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Eye, EyeOff, Loader2, Mail, ArrowLeft, ArrowRight, CheckCircle2, KeyRound } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { loginAction, resetPasswordRequestAction } from '@/features/authentication/actions';
import { useI18n } from '@/lib/i18n/context';

export function LoginForm() {
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [isResetMode, setIsResetMode] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resetSuccessMessage, setResetSuccessMessage] = useState<string | null>(null);
  const { t, isRtl } = useI18n();

  useEffect(() => {
    const errorParam = searchParams.get('error');
    if (errorParam) {
      setError(errorParam);
    }
  }, [searchParams]);

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setResetSuccessMessage(null);

    if (!email || !password) {
      setError(isRtl ? 'يرجى إدخال البريد الإلكتروني وكلمة المرور.' : 'Please enter both email and password.');
      return;
    }

    startTransition(async () => {
      const result = await loginAction({ email, password });
      if (result && !result.success) {
        setError(result.error || (isRtl ? 'فشل تسجيل الدخول' : 'Login failed'));
      }
    });
  }

  function handleResetRequest(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setResetSuccessMessage(null);

    if (!email) {
      setError(isRtl ? 'يرجى إدخال البريد الإلكتروني أولاً.' : 'Please enter your email address first.');
      return;
    }

    startTransition(async () => {
      const result = await resetPasswordRequestAction(email);
      if (result && !result.success) {
        setError(result.error || (isRtl ? 'فشل إرسال رابط الاستعادة' : 'Failed to send reset link'));
      } else if (result && result.success) {
        setResetSuccessMessage(
          result.message ||
            (isRtl
              ? 'تم إرسال رابط إعادة التعيين إلى بريدك في Gmail بنجاح!'
              : 'Password reset link sent to your Gmail!')
        );
      }
    });
  }

  return (
    <Card className="shadow-lg border-border/60">
      {isResetMode ? (
        <form onSubmit={handleResetRequest}>
          <CardHeader className="pb-3 text-center">
            <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
              <KeyRound className="h-5 w-5" />
            </div>
            <CardTitle className="text-lg">
              {isRtl ? 'إعادة تعيين كلمة المرور' : 'Reset Password'}
            </CardTitle>
            <CardDescription className="text-xs">
              {isRtl
                ? 'أدخل بريدك الإلكتروني لإرسال رابط مباشر إلى Gmail لتعيين كلمة مرور جديدة'
                : 'Enter your email to receive a password reset link on Gmail'}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4 pt-1">
            {error && (
              <div className="rounded-md bg-destructive/10 border border-destructive/20 px-3 py-2 text-sm text-destructive">
                {error}
              </div>
            )}

            {resetSuccessMessage ? (
              <div className="rounded-md bg-emerald-500/10 border border-emerald-500/20 p-3 space-y-2 text-emerald-700 dark:text-emerald-400">
                <div className="flex items-center gap-2 font-medium text-sm">
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                  <span>{isRtl ? 'تم إرسال الرابط بنجاح!' : 'Link Sent!'}</span>
                </div>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  {resetSuccessMessage}
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                <Label htmlFor="reset-email">{t.admin.email}</Label>
                <div className="relative">
                  <Input
                    id="reset-email"
                    type="email"
                    placeholder="azaki5030@gmail.com"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isPending}
                    required
                    className={isRtl ? 'pl-9 pr-3' : 'pr-9 pl-3'}
                  />
                  <Mail
                    className={`absolute ${
                      isRtl ? 'left-3' : 'right-3'
                    } top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none`}
                  />
                </div>
              </div>
            )}
          </CardContent>

          <CardFooter className="flex-col gap-2 pt-2">
            {!resetSuccessMessage ? (
              <Button type="submit" className="w-full gap-2" disabled={isPending}>
                {isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    {isRtl ? 'جاري الإرسال إلى Gmail...' : 'Sending to Gmail...'}
                  </>
                ) : (
                  <>
                    <Mail className="h-4 w-4" />
                    {isRtl ? 'إرسال رابط الاستعادة إلى Gmail' : 'Send Reset Link to Gmail'}
                  </>
                )}
              </Button>
            ) : null}

            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="w-full text-xs text-muted-foreground hover:text-foreground gap-1"
              onClick={() => {
                setIsResetMode(false);
                setError(null);
                setResetSuccessMessage(null);
              }}
            >
              {isRtl ? <ArrowRight className="h-3 w-3" /> : <ArrowLeft className="h-3 w-3" />}
              {isRtl ? 'الرجوع إلى تسجيل الدخول' : 'Back to Sign In'}
            </Button>
          </CardFooter>
        </form>
      ) : (
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4 pt-6">
            {error && (
              <div className="rounded-md bg-destructive/10 border border-destructive/20 px-3 py-2 text-sm text-destructive">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">{t.admin.email}</Label>
              <Input
                id="email"
                type="email"
                placeholder="azaki5030@gmail.com"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isPending}
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">{t.admin.password}</Label>
                <button
                  type="button"
                  onClick={() => {
                    setIsResetMode(true);
                    setError(null);
                  }}
                  className="text-xs text-primary hover:underline font-medium"
                >
                  {isRtl ? 'نسيت كلمة المرور؟' : 'Forgot password?'}
                </button>
              </div>

              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isPending}
                  required
                  className={isRtl ? 'pl-10 pr-3' : 'pr-10 pl-3'}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute ${
                    isRtl ? 'left-3' : 'right-3'
                  } top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground`}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex-col gap-3">
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t.admin.signingIn}
                </>
              ) : (
                t.admin.signIn
              )}
            </Button>

            <div className="w-full pt-1 border-t border-border/50 text-center">
              <button
                type="button"
                onClick={() => {
                  setIsResetMode(true);
                  setError(null);
                }}
                className="text-xs text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1.5"
              >
                <Mail className="h-3 w-3 text-primary" />
                {isRtl
                  ? 'نسيت كلمة المرور؟ اضغط هنا لإرسالها لـ Gmail'
                  : 'Forgot password? Send reset link to Gmail'}
              </button>
            </div>
          </CardFooter>
        </form>
      )}
    </Card>
  );
}
