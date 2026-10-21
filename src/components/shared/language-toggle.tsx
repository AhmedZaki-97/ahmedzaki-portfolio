'use client';

import { Languages } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useI18n } from '@/lib/i18n/context';
import { cn } from '@/lib/utils';

interface LanguageToggleProps {
  className?: string;
  variant?: 'outline' | 'ghost' | 'default';
  showLabel?: boolean;
}

export function LanguageToggle({
  className,
  variant = 'ghost',
  showLabel = true,
}: LanguageToggleProps) {
  const { locale, toggleLocale } = useI18n();

  return (
    <Button
      variant={variant}
      size="sm"
      onClick={toggleLocale}
      className={cn(
        'gap-1.5 px-2.5 font-medium transition-all text-xs sm:text-sm',
        className
      )}
      aria-label={locale === 'ar' ? 'Switch to English' : 'التحويل إلى العربية'}
      title={locale === 'ar' ? 'Switch to English' : 'التحويل إلى العربية'}
    >
      <Languages className="h-4 w-4 text-primary" />
      {showLabel && (
        <span className="font-semibold">
          {locale === 'ar' ? 'English' : 'عربي'}
        </span>
      )}
    </Button>
  );
}
