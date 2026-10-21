'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProjectCard } from './project-card';
import { useI18n } from '@/lib/i18n/context';
import type { Project } from '@/types';

interface FeaturedProjectsProps {
  projects: Project[];
}

export function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  const { t, isRtl } = useI18n();

  if (projects.length === 0) {
    return null;
  }

  return (
    <section className="py-20 md:py-28">
      <div className="container-wide">
        <div className="flex items-end justify-between mb-12">
          <div className="space-y-2">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              {t.projects.featuredHeading}
            </h2>
            <p className="text-muted-foreground text-lg">
              {t.projects.featuredSubtitle}
            </p>
          </div>
          <Button asChild variant="ghost" className="hidden sm:flex gap-2">
            <Link href="/projects">
              {t.projects.viewAll}
              <ArrowRight className={`h-4 w-4 ${isRtl ? 'rotate-180' : ''}`} />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Button asChild variant="outline" className="gap-2">
            <Link href="/projects">
              {t.projects.viewAll}
              <ArrowRight className={`h-4 w-4 ${isRtl ? 'rotate-180' : ''}`} />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
