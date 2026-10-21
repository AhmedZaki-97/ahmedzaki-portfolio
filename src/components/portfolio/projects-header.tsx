'use client';

import { useI18n } from '@/lib/i18n/context';

export function ProjectsHeader() {
  const { t } = useI18n();

  return (
    <div className="space-y-2 mb-10">
      <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
        {t.projects.title}
      </h1>
      <p className="text-lg text-muted-foreground">
        {t.projects.subtitle}
      </p>
    </div>
  );
}
