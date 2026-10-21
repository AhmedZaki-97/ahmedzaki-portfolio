import type { Metadata } from 'next';
import Link from 'next/link';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getAllProjects } from '@/features/projects/services';
import { AdminProjectsTable } from '@/components/admin/projects-table';

export const metadata: Metadata = {
  title: 'Manage Projects',
  robots: { index: false, follow: false },
};

export default async function AdminProjectsPage() {
  const projects = await getAllProjects();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground">Manage your portfolio projects</p>
        </div>
        <Button asChild className="gap-2">
          <Link href="/admin/projects/new">
            <PlusCircle className="h-4 w-4" />
            Add Project
          </Link>
        </Button>
      </div>

      <AdminProjectsTable projects={projects} />
    </div>
  );
}
