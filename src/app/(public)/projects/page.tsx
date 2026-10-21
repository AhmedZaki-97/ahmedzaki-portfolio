import type { Metadata } from 'next';
import { Suspense } from 'react';
import { ProjectCard } from '@/components/portfolio/project-card';
import { ProjectFilters } from '@/components/portfolio/project-filters';
import { ProjectsHeader } from '@/components/portfolio/projects-header';
import { getPublishedProjects, getProjectCategories } from '@/features/projects/services';
import { Skeleton } from '@/components/ui/skeleton';
import { FolderOpen } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Explore my development projects, from web applications to dashboards and more.',
};

function ProjectsGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="space-y-3">
          <Skeleton className="aspect-video w-full rounded-lg" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <div className="flex gap-2">
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-5 w-16" />
          </div>
        </div>
      ))}
    </div>
  );
}

async function ProjectsContent({
  search,
  category,
}: {
  search?: string;
  category?: string;
}) {
  const { projects } = await getPublishedProjects({ search, category });

  if (projects.length === 0) {
    return (
      <div className="text-center py-20">
        <FolderOpen className="mx-auto h-12 w-12 text-muted-foreground/50" />
        <h3 className="mt-4 text-lg font-semibold">No projects found</h3>
        <p className="text-muted-foreground mt-1">
          {search || category
            ? 'Try adjusting your filters or search terms.'
            : 'Check back later for new projects.'}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}

interface ProjectsPageProps {
  searchParams: Promise<{ search?: string; category?: string }>;
}

export default async function ProjectsPage(props: ProjectsPageProps) {
  const searchParams = await props.searchParams;
  const search = typeof searchParams.search === 'string' ? searchParams.search : undefined;
  const category = typeof searchParams.category === 'string' ? searchParams.category : undefined;
  const categories = await getProjectCategories();

  return (
    <section className="py-20 md:py-28">
      <div className="container-wide">
        <ProjectsHeader />

        <div className="mb-8">
          <Suspense fallback={null}>
            <ProjectFilters categories={categories} />
          </Suspense>
        </div>

        <Suspense fallback={<ProjectsGridSkeleton />}>
          <ProjectsContent search={search} category={category} />
        </Suspense>
      </div>
    </section>
  );
}
