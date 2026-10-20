import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ProjectForm } from '@/components/admin/project-form';
import { getProjectById } from '@/features/projects/services';

export const metadata: Metadata = {
  title: 'Edit Project',
  robots: { index: false, follow: false },
};

export default async function EditProjectPage(
  props: PageProps<"/admin/projects/[id]/edit">
) {
  const params = await props.params;
  const project = await getProjectById(params.id);

  if (!project) {
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Edit Project</h1>
        <p className="text-muted-foreground">Update &quot;{project.title}&quot;</p>
      </div>
      <ProjectForm project={project} />
    </div>
  );
}
