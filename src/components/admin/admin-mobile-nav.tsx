'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useTransition } from 'react';
import {
  Menu,
  LayoutDashboard,
  FolderKanban,
  PlusCircle,
  Wrench,
  Settings,
  ExternalLink,
  LogOut,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { ThemeToggle } from '@/components/shared/theme-toggle';
import { LanguageToggle } from '@/components/shared/language-toggle';
import { logoutAction } from '@/features/authentication/actions';
import { useI18n } from '@/lib/i18n/context';

export function AdminMobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { t, isRtl } = useI18n();

  const sidebarLinks = [
    { label: t.admin.dashboard, href: '/admin/dashboard', icon: LayoutDashboard },
    { label: t.admin.projects, href: '/admin/projects', icon: FolderKanban },
    { label: t.admin.newProject, href: '/admin/projects/new', icon: PlusCircle },
    { label: t.admin.skills, href: '/admin/skills', icon: Wrench },
    { label: t.admin.settings, href: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="lg:hidden flex items-center justify-between h-14 px-4 border-b border-border bg-card/50 sticky top-0 z-40">
      <Link href="/admin/dashboard" className="text-lg font-bold tracking-tight">
        Admin<span className="text-primary">Panel</span>
      </Link>

      <div className="flex items-center gap-1.5">
        <LanguageToggle showLabel={false} />
        <ThemeToggle />
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Open menu">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side={isRtl ? 'right' : 'left'} className="w-64 p-0">
            <SheetTitle className="px-4 pt-4 text-lg font-bold">
              Admin<span className="text-primary">Panel</span>
            </SheetTitle>
            <nav className="px-3 py-4 space-y-1">
              {sidebarLinks.map((link) => {
                const Icon = link.icon;
                const isActive =
                  pathname === link.href ||
                  (link.href !== '/admin/dashboard' && pathname.startsWith(link.href));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      'flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-colors',
                      isActive
                        ? 'bg-primary/10 text-primary'
                        : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {link.label}
                  </Link>
                );
              })}
              <Separator className="my-4" />
              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors"
              >
                <ExternalLink className="h-4 w-4" />
                {t.admin.backToSite}
              </a>
              <form
                action={() => {
                  startTransition(() => logoutAction());
                }}
              >
                <Button
                  type="submit"
                  variant="ghost"
                  className="w-full justify-start gap-3 text-muted-foreground hover:text-foreground"
                  disabled={isPending}
                >
                  <LogOut className={`h-4 w-4 ${isRtl ? 'rotate-180' : ''}`} />
                  {isPending ? t.admin.loggingOut : t.admin.logout}
                </Button>
              </form>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
