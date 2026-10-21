'use client';

import Link from 'next/link';
import {
  FolderKanban,
  Globe,
  FileEdit,
  Star,
  PlusCircle,
  ArrowRight,
  AlertTriangle,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useI18n } from '@/lib/i18n/context';
import type { Project } from '@/types';

interface DashboardContentProps {
  stats: {
    total: number;
    published: number;
    draft: number;
    featured: number;
  };
  recentProjects: Project[];
  showWhatsAppReminder: boolean;
}

export function DashboardContent({
  stats,
  recentProjects,
  showWhatsAppReminder,
}: DashboardContentProps) {
  const { t, isRtl } = useI18n();

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t.admin.dashboard}</h1>
          <p className="text-muted-foreground">{t.admin.welcomeBack}</p>
        </div>
        <Button asChild className="gap-2">
          <Link href="/admin/projects/new">
            <PlusCircle className="h-4 w-4" />
            {t.admin.newProject}
          </Link>
        </Button>
      </div>

      {/* WhatsApp reminder */}
      {showWhatsAppReminder && (
        <Card className="border-yellow-500/50 bg-yellow-500/5">
          <CardContent className="flex items-center gap-3 py-4">
            <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-medium">{t.admin.whatsAppNotConfigured}</p>
              <p className="text-xs text-muted-foreground">
                {t.admin.whatsAppReminder}
              </p>
            </div>
            <Button asChild variant="outline" size="sm">
              <Link href="/admin/settings">{t.admin.configure}</Link>
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t.admin.totalProjects}
            </CardTitle>
            <FolderKanban className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t.admin.publishedProjects}
            </CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600 dark:text-green-400">{stats.published}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t.admin.draftProjects}
            </CardTitle>
            <FileEdit className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">{stats.draft}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t.admin.featuredProjects}
            </CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">{stats.featured}</div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Projects */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>{t.admin.recentProjects}</CardTitle>
          <Button asChild variant="ghost" size="sm" className="gap-1">
            <Link href="/admin/projects">
              {t.projects.viewAll}
              <ArrowRight className={`h-3.5 w-3.5 ${isRtl ? 'rotate-180' : ''}`} />
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          {recentProjects.length === 0 ? (
            <div className="text-center py-8">
              <FolderKanban className="mx-auto h-10 w-10 text-muted-foreground/40" />
              <p className="text-sm text-muted-foreground mt-2">{t.admin.noProjectsYet}</p>
              <Button asChild size="sm" className="mt-4 gap-2">
                <Link href="/admin/projects/new">
                  <PlusCircle className="h-3.5 w-3.5" />
                  {t.admin.createFirstProject}
                </Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {recentProjects.map((project) => (
                <div
                  key={project.id}
                  className="flex items-center justify-between gap-4 rounded-lg border border-border/50 p-3 hover:bg-accent/50 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium truncate">{project.title}</p>
                      <Badge
                        variant={project.status === 'published' ? 'default' : 'secondary'}
                        className="text-[10px] px-1.5 shrink-0"
                      >
                        {project.status === 'published' ? t.projects.published : t.projects.draft}
                      </Badge>
                      {project.is_featured && (
                        <Star className="h-3 w-3 text-yellow-500 fill-yellow-500 shrink-0" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {new Date(project.updated_at).toLocaleDateString()}
                    </p>
                  </div>
                  <Button asChild variant="ghost" size="sm">
                    <Link href={`/admin/projects/${project.id}/edit`}>{t.admin.edit}</Link>
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
