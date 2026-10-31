'use client';

import React, { useState, useTransition, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  KeyRound,
  CheckCircle2,
  AlertCircle,
  Sparkles,
} from 'lucide-react';
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
  const { isRtl } = useI18n();

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
      setError(isRtl ? 'يرجى إدخال البريد الإلكتروني أولاً.' : 'Please enter your email first.');
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
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-4 text-white">
      {/* دوائر الإضاءة المتحركة في الخلفية (Ambient Glowing Orbs) */}
      <motion.div
        animate={{
          scale: [1, 1.25, 1],
          opacity: [0.25, 0.45, 0.25],
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute -top-20 -left-20 h-96 w-96 rounded-full bg-blue-600/30 blur-[130px]"
      />

      <motion.div
        animate={{
          scale: [1, 1.35, 1],
          opacity: [0.2, 0.4, 0.2],
          x: [0, -45, 0],
          y: [0, -50, 0],
        }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute -bottom-20 -right-20 h-96 w-96 rounded-full bg-cyan-500/20 blur-[140px]"
      />

      {/* دائرة ضوء مركزية إضافية لإبراز تأثير الزجاج */}
      <motion.div
        animate={{
          opacity: [0.1, 0.25, 0.1],
          scale: [0.9, 1.1, 0.9],
        }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-indigo-600/10 blur-[150px]"
      />

      {/* كارت تسجيل الدخول الزجاجي (Glassmorphism Card) */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-md rounded-2xl border border-slate-800/80 bg-slate-900/60 p-8 shadow-2xl shadow-black/60 backdrop-blur-2xl"
      >
        <AnimatePresence mode="wait">
          {isResetMode ? (
            /* نموذج استعادة كلمة المرور عبر Gmail */
            <motion.div
              key="reset-mode"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-6 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', damping: 15 }}
                  className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-tr from-blue-600/30 to-cyan-500/20 border border-blue-500/30 text-cyan-400"
                >
                  <KeyRound className="h-6 w-6" />
                </motion.div>
                <h1 className="text-2xl font-bold tracking-tight text-white">
                  {isRtl ? 'استعادة كلمة المرور' : 'Reset Password'}
                </h1>
                <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                  {isRtl
                    ? 'أدخل بريدك الإلكتروني لتلقي رابط مباشر على Gmail لتعيين كلمة مرور جديدة'
                    : 'Enter your email to receive a password reset link on Gmail'}
                </p>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-5 flex items-start gap-2.5 rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-xs text-rose-300"
                >
                  <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                  <span>{error}</span>
                </motion.div>
              )}

              {resetSuccessMessage ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-emerald-300 text-center"
                >
                  <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-semibold text-sm">
                      {isRtl ? 'تم إرسال الرابط بنجاح!' : 'Link Sent Successfully!'}
                    </p>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {resetSuccessMessage}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setIsResetMode(false);
                      setError(null);
                      setResetSuccessMessage(null);
                    }}
                    className="mt-2 inline-flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 hover:underline"
                  >
                    {isRtl ? <ArrowRight className="h-3.5 w-3.5" /> : <ArrowLeft className="h-3.5 w-3.5" />}
                    {isRtl ? 'العودة لصفحة تسجيل الدخول' : 'Back to Sign In'}
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleResetRequest} className="space-y-5" dir={isRtl ? 'rtl' : 'ltr'}>
                  <div>
                    <label className="block text-sm font-medium text-slate-300">
                      {isRtl ? 'البريد الإلكتروني للأدمن' : 'Admin Email'}
                    </label>
                    <div className="relative mt-2">
                      <Mail
                        className={`absolute ${
                          isRtl ? 'right-3' : 'left-3'
                        } top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500`}
                      />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="azaki5030@gmail.com"
                        disabled={isPending}
                        className={`w-full rounded-xl border border-slate-800 bg-slate-950/60 py-3 ${
                          isRtl ? 'pr-11 pl-4' : 'pl-11 pr-4'
                        } text-sm text-white placeholder-slate-600 transition-all focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
                      />
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isPending}
                    className="relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition-all hover:opacity-95 disabled:opacity-50"
                  >
                    {isPending ? (
                      <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    ) : (
                      <>
                        <Mail className="h-4 w-4" />
                        <span>{isRtl ? 'إرسال رابط الاستعادة إلى Gmail' : 'Send Reset Link to Gmail'}</span>
                      </>
                    )}
                  </motion.button>

                  <div className="pt-2 text-center">
                    <button
                      type="button"
                      onClick={() => {
                        setIsResetMode(false);
                        setError(null);
                      }}
                      className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
                    >
                      {isRtl ? <ArrowRight className="h-3.5 w-3.5" /> : <ArrowLeft className="h-3.5 w-3.5" />}
                      {isRtl ? 'الرجوع إلى تسجيل الدخول' : 'Back to Login'}
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          ) : (
            /* نموذج تسجيل الدخول الرئيسي */
            <motion.div
              key="login-mode"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-8 text-center">
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, duration: 0.5 }}
                  className="inline-flex items-center gap-1.5 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-medium text-cyan-400 mb-3"
                >
                  <Sparkles className="h-3 w-3" />
                  <span>Admin Portal</span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="text-3xl font-bold tracking-tight text-white"
                >
                  {isRtl ? 'مرحباً بعودتك' : 'Welcome Back'}
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="mt-2 text-sm text-slate-400"
                >
                  {isRtl
                    ? 'أدخل بياناتك لتسجيل الدخول إلى لوحة التحكم'
                    : 'Sign in to access your administrative dashboard'}
                </motion.p>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-5 flex items-start gap-2.5 rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-xs text-rose-300"
                >
                  <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                  <span>{error}</span>
                </motion.div>
              )}

              <form onSubmit={handleLogin} className="space-y-5" dir={isRtl ? 'rtl' : 'ltr'}>
                {/* حقل البريد الإلكتروني */}
                <motion.div
                  initial={{ opacity: 0, x: isRtl ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <label className="block text-sm font-medium text-slate-300">
                    {isRtl ? 'البريد الإلكتروني' : 'Email Address'}
                  </label>
                  <div className="relative mt-2">
                    <Mail
                      className={`absolute ${
                        isRtl ? 'right-3' : 'left-3'
                      } top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500 pointer-events-none`}
                    />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="azaki5030@gmail.com"
                      disabled={isPending}
                      className={`w-full rounded-xl border border-slate-800 bg-slate-950/60 py-3 ${
                        isRtl ? 'pr-11 pl-4' : 'pl-11 pr-4'
                      } text-sm text-white placeholder-slate-600 transition-all focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
                    />
                  </div>
                </motion.div>

                {/* حقل كلمة المرور */}
                <motion.div
                  initial={{ opacity: 0, x: isRtl ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  <div className="flex items-center justify-between">
                    <label className="block text-sm font-medium text-slate-300">
                      {isRtl ? 'كلمة المرور' : 'Password'}
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        setIsResetMode(true);
                        setError(null);
                      }}
                      className="text-xs text-blue-400 hover:text-cyan-300 transition-colors hover:underline"
                    >
                      {isRtl ? 'نسيت كلمة المرور؟' : 'Forgot password?'}
                    </button>
                  </div>
                  <div className="relative mt-2">
                    <Lock
                      className={`absolute ${
                        isRtl ? 'right-3' : 'left-3'
                      } top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500 pointer-events-none`}
                    />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      disabled={isPending}
                      className={`w-full rounded-xl border border-slate-800 bg-slate-950/60 py-3 ${
                        isRtl ? 'pr-11 pl-11' : 'pl-11 pr-11'
                      } text-sm text-white placeholder-slate-600 transition-all focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className={`absolute ${
                        isRtl ? 'left-3' : 'right-3'
                      } top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors`}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </motion.div>

                {/* زر تسجيل الدخول */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isPending}
                  className="relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition-all hover:opacity-95 disabled:opacity-50 cursor-pointer"
                >
                  {isPending ? (
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  ) : (
                    <>
                      <span>{isRtl ? 'تسجيل الدخول' : 'Sign In'}</span>
                      <ArrowRight className={`h-4 w-4 ${isRtl ? 'rotate-180' : ''}`} />
                    </>
                  )}
                </motion.button>

                {/* زر مخصص لاستعادة كلمة المرور عبر Gmail */}
                <div className="pt-2 text-center border-t border-slate-800/80">
                  <button
                    type="button"
                    onClick={() => {
                      setIsResetMode(true);
                      setError(null);
                    }}
                    className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-cyan-400 transition-colors"
                  >
                    <Mail className="h-3.5 w-3.5 text-cyan-500" />
                    <span>
                      {isRtl
                        ? 'نسيت كلمة المرور؟ اضغط هنا لإرسالها لـ Gmail'
                        : 'Forgot password? Click here to reset via Gmail'}
                    </span>
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
