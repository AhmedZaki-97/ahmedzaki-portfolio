'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ExternalLink, ArrowUpRight } from 'lucide-react';
import { Github } from '@/components/shared/icons';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useI18n } from '@/lib/i18n/context';
import type { Project } from '@/types';

interface ProjectCardProps {
  project: Project;
}

const categoryTranslations: Record<string, string> = {
  'Frontend': 'واجهات أمامية',
  'Full Stack': 'تطبيقات متكاملة',
  'Mobile': 'تطبيقات هاتف',
  'UI/UX': 'تصميم واجهات',
  'Other': 'أخرى',
};

export function ProjectCard({ project }: ProjectCardProps) {
  const { t, locale, isRtl } = useI18n();

  const categoryName =
    locale === 'ar'
      ? categoryTranslations[project.category] || project.category
      : project.category;

  return (
    <Card className="group overflow-hidden border-border/50 bg-card/50 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 flex flex-col h-full">
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden bg-muted shrink-0">
        {project.thumbnail_path ? (
          <Image
            src={project.thumbnail_path}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="flex items-center justify-center h-full bg-gradient-to-br from-primary/10 to-chart-2/10">
            <span className="text-3xl font-bold text-primary/30">
              {project.title.charAt(0)}
            </span>
          </div>
        )}

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className={`absolute bottom-3 ${isRtl ? 'left-3' : 'right-3'} flex gap-2`}>
            {project.live_url && (
              <a
                href={project.live_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center h-9 w-9 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors"
                aria-label={`${t.projects.liveDemo}: ${project.title}`}
                title={t.projects.liveDemo}
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            )}
            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center h-9 w-9 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors"
                aria-label={`${t.projects.sourceCode}: ${project.title}`}
                title={t.projects.sourceCode}
                onClick={(e) => e.stopPropagation()}
              >
                <Github className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <CardContent className="p-5 space-y-3 flex flex-col flex-1">
        <div className="space-y-1">
          <Badge variant="secondary" className="text-xs">
            {categoryName}
          </Badge>
          <h3 className="text-lg font-semibold leading-tight group-hover:text-primary transition-colors">
            <Link href={`/projects/${project.slug}`} className="focus-ring rounded-sm inline-flex items-center gap-1">
              <span>{project.title}</span>
              <ArrowUpRight className={`h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity ${isRtl ? '-scale-x-100' : ''}`} />
            </Link>
          </h3>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2 flex-1">
          {project.short_description}
        </p>

        {/* Technologies */}
        {project.technologies.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {project.technologies.slice(0, 5).map((tech) => (
              <span
                key={tech}
                className="inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-md bg-primary/10 text-primary"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 5 && (
              <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-md bg-muted text-muted-foreground">
                +{project.technologies.length - 5}
              </span>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
