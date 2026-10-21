'use client';

import React, { createContext, useContext, useEffect, useState, useMemo, useCallback } from 'react';
import { translations, type Locale, type Translations } from './translations';

interface I18nContextType {
  locale: Locale;
  dir: 'ltr' | 'rtl';
  t: Translations;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  isRtl: boolean;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

const STORAGE_KEY = 'portfolio_locale';

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('ar'); // Default to Arabic as requested, or load from storage
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Read from localStorage or cookie
    const saved = localStorage.getItem(STORAGE_KEY) as Locale | null;
    if (saved === 'en' || saved === 'ar') {
      setLocaleState(saved);
      document.documentElement.dir = saved === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = saved;
    } else {
      // Default to Arabic
      document.documentElement.dir = 'rtl';
      document.documentElement.lang = 'ar';
    }
    setMounted(true);
  }, []);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    try {
      localStorage.setItem(STORAGE_KEY, newLocale);
      document.cookie = `NEXT_LOCALE=${newLocale};path=/;max-age=31536000;SameSite=Lax`;
      document.documentElement.dir = newLocale === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = newLocale;
    } catch {
      // ignore in environments without localStorage
    }
  }, []);

  const toggleLocale = useCallback(() => {
    const next = locale === 'en' ? 'ar' : 'en';
    setLocale(next);
  }, [locale, setLocale]);

  const value = useMemo<I18nContextType>(() => {
    const dir = locale === 'ar' ? 'rtl' : 'ltr';
    return {
      locale,
      dir,
      t: translations[locale],
      setLocale,
      toggleLocale,
      isRtl: dir === 'rtl',
    };
  }, [locale, setLocale, toggleLocale]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nContextType {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}
