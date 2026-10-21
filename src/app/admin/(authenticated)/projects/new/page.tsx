import type { Metadata } from 'next';
import { ProjectForm } from '@/components/admin/project-form';

export const metadata: Metadata = {
  title: 'Add Project',
  robots: { index: false, follow: false },
};

export default function NewProjectPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Add Project</h1>
        <p className="text-muted-foreground">Create a new project for your portfolio</p>
      </div>
      <ProjectForm />
    </div>
  );
}
