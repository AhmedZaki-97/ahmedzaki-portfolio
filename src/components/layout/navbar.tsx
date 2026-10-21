'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { ThemeToggle } from '@/components/shared/theme-toggle';
import { LanguageToggle } from '@/components/shared/language-toggle';
import { cn } from '@/lib/utils';
import { buildWhatsAppUrl } from '@/lib/utils/whatsapp';
import { useI18n } from '@/lib/i18n/context';

interface NavbarProps {
  whatsappNumber?: string | null;
  whatsappMessage?: string | null;
}

export function Navbar({ whatsappNumber, whatsappMessage }: NavbarProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { t, locale, isRtl } = useI18n();

  const navItems = [
    { href: '/', label: t.nav.home },
    { href: '/about', label: t.nav.about },
    { href: '/projects', label: t.nav.projects },
    { href: '/contact', label: t.nav.contact },
  ];

  const whatsappUrl = whatsappNumber
    ? buildWhatsAppUrl(whatsappNumber, whatsappMessage)
    : null;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <nav className="container-wide flex h-16 items-center justify-between">
        {/* Logo / Wordmark */}
        <Link
          href="/"
          className="text-lg font-bold tracking-tight transition-colors hover:text-primary"
        >
          {locale === 'ar' ? 'أحمد ' : 'Ahmed'}
          <span className="text-primary">{locale === 'ar' ? 'زكي' : 'Zaki'}</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'px-3.5 py-2 text-sm font-medium rounded-md transition-colors focus-ring',
                pathname === link.href
                  ? 'text-primary bg-primary/10'
                  : 'text-muted-foreground hover:text-foreground hover:bg-accent'
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-2">
          <LanguageToggle />
          <ThemeToggle />
          {whatsappUrl && (
            <Button asChild size="sm" className="gap-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Contact via WhatsApp"
              >
                <MessageCircle className="h-4 w-4" />
                {t.nav.whatsApp}
              </a>
            </Button>
          )}
        </div>

        {/* Mobile Navigation */}
        <div className="flex md:hidden items-center gap-1.5">
          <LanguageToggle showLabel={false} />
          <ThemeToggle />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9" aria-label={t.nav.openMenu}>
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side={isRtl ? 'left' : 'right'} className="w-72">
              <SheetTitle className="text-lg font-bold">
                {locale === 'ar' ? 'أحمد ' : 'Ahmed'}
                <span className="text-primary">{locale === 'ar' ? 'زكي' : 'Zaki'}</span>
              </SheetTitle>
              <nav className="flex flex-col gap-1 mt-6">
                {navItems.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      'px-3 py-2.5 text-sm font-medium rounded-md transition-colors focus-ring',
                      pathname === link.href
                        ? 'text-primary bg-primary/10'
                        : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
                {whatsappUrl && (
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2 px-3 py-2.5 text-sm font-medium text-primary rounded-md hover:bg-primary/10 transition-colors mt-2"
                  >
                    <MessageCircle className="h-4 w-4" />
                    {t.nav.whatsApp}
                  </a>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
