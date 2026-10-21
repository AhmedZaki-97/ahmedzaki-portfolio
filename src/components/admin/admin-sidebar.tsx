'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
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
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { ThemeToggle } from '@/components/shared/theme-toggle';
import { LanguageToggle } from '@/components/shared/language-toggle';
import { logoutAction } from '@/features/authentication/actions';
import { useTransition } from 'react';
import { useI18n } from '@/lib/i18n/context';

export function AdminSidebar() {
  const pathname = usePathname();
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
    <aside className={cn(
      'hidden lg:flex lg:flex-col lg:w-64 border-border bg-card/50 h-screen sticky top-0',
      isRtl ? 'border-l' : 'border-r'
    )}>
      {/* Header */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-border gap-2">
        <Link href="/admin/dashboard" className="text-lg font-bold tracking-tight">
          Admin<span className="text-primary">Panel</span>
        </Link>
        <div className="flex items-center gap-1">
          <LanguageToggle showLabel={false} />
          <ThemeToggle />
        </div>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-1">
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            const isActive =
              pathname === link.href ||
              (link.href !== '/admin/dashboard' && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-colors focus-ring',
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
        </nav>

        <Separator className="my-4" />

        <nav className="space-y-1">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors"
          >
            <ExternalLink className="h-4 w-4" />
            {t.admin.backToSite}
          </a>
        </nav>
      </ScrollArea>

      {/* Footer */}
      <div className="p-3 border-t border-border">
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
      </div>
    </aside>
  );
}
