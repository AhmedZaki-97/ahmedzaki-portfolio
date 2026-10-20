'use client';

import { useState, useTransition } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  Edit,
  Trash2,
  Star,
  Globe,
  FileEdit,
  MoreHorizontal,
  Search,
  FolderKanban,
  PlusCircle,
  Eye,
} from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { deleteProject, toggleProjectStatus, toggleProjectFeatured } from '@/features/projects/actions';
import type { Project } from '@/types';

interface AdminProjectsTableProps {
  projects: Project[];
}

export function AdminProjectsTable({ projects }: AdminProjectsTableProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [search, setSearch] = useState('');
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteTitle, setDeleteTitle] = useState('');

  const filteredProjects = projects.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
  );

  function handleToggleStatus(id: string) {
    startTransition(async () => {
      const result = await toggleProjectStatus(id);
      if (result.success) {
        toast.success('Project status updated');
        router.refresh();
      } else {
        toast.error(result.error || 'Failed to update status');
      }
    });
  }

  function handleToggleFeatured(id: string) {
    startTransition(async () => {
      const result = await toggleProjectFeatured(id);
      if (result.success) {
        toast.success('Featured status updated');
        router.refresh();
      } else {
        toast.error(result.error || 'Failed to update featured status');
      }
    });
  }

  function handleDelete() {
    if (!deleteId) return;
    startTransition(async () => {
      const result = await deleteProject(deleteId);
      if (result.success) {
        toast.success('Project deleted successfully');
        setDeleteId(null);
        router.refresh();
      } else {
        toast.error(result.error || 'Failed to delete project');
      }
    });
  }

  if (projects.length === 0) {
    return (
      <div className="text-center py-16 border border-dashed border-border rounded-lg">
        <FolderKanban className="mx-auto h-12 w-12 text-muted-foreground/40" />
        <h3 className="mt-4 text-lg font-semibold">No projects yet</h3>
        <p className="text-muted-foreground mt-1">Get started by creating your first project.</p>
        <Button asChild className="mt-4 gap-2">
          <Link href="/admin/projects/new">
            <PlusCircle className="h-4 w-4" />
            Add Project
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <>
      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search projects..."
          className="pl-10"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="border border-border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[60px]">Image</TableHead>
              <TableHead>Title</TableHead>
              <TableHead className="hidden md:table-cell">Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden sm:table-cell">Featured</TableHead>
              <TableHead className="hidden lg:table-cell">Updated</TableHead>
              <TableHead className="w-[60px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProjects.map((project) => (
              <TableRow key={project.id} className={isPending ? 'opacity-60' : ''}>
                <TableCell>
                  <div className="relative h-10 w-14 rounded overflow-hidden bg-muted">
                    {project.thumbnail_path ? (
                      <Image
                        src={project.thumbnail_path}
                        alt={project.title}
                        fill
                        className="object-cover"
                        sizes="56px"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-xs text-muted-foreground font-semibold">
                        {project.title.charAt(0)}
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium text-sm">{project.title}</p>
                    <p className="text-xs text-muted-foreground truncate max-w-[200px]">
                      {project.short_description}
                    </p>
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <Badge variant="outline" className="text-xs">{project.category}</Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={project.status === 'published' ? 'default' : 'secondary'}
                    className="text-xs"
                  >
                    {project.status === 'published' ? (
                      <><Globe className="h-3 w-3 mr-1" /> Published</>
                    ) : (
                      <><FileEdit className="h-3 w-3 mr-1" /> Draft</>
                    )}
                  </Badge>
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  <button
                    onClick={() => handleToggleFeatured(project.id)}
                    disabled={isPending}
                    className="focus-ring rounded"
                    aria-label={project.is_featured ? 'Unfeature project' : 'Feature project'}
                  >
                    <Star
                      className={`h-4 w-4 transition-colors ${
                        project.is_featured
                          ? 'text-yellow-500 fill-yellow-500'
                          : 'text-muted-foreground hover:text-yellow-500'
                      }`}
                    />
                  </button>
                </TableCell>
                <TableCell className="hidden lg:table-cell">
                  <span className="text-xs text-muted-foreground">
                    {new Date(project.updated_at).toLocaleDateString()}
                  </span>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Actions</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/admin/projects/${project.id}/edit`}>
                          <Edit className="mr-2 h-3.5 w-3.5" />
                          Edit
                        </Link>
                      </DropdownMenuItem>
                      {project.status === 'published' && (
                        <DropdownMenuItem asChild>
                          <a href={`/projects/${project.slug}`} target="_blank" rel="noopener noreferrer">
                            <Eye className="mr-2 h-3.5 w-3.5" />
                            View Public
                          </a>
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem onClick={() => handleToggleStatus(project.id)}>
                        {project.status === 'published' ? (
                          <><FileEdit className="mr-2 h-3.5 w-3.5" /> Unpublish</>
                        ) : (
                          <><Globe className="mr-2 h-3.5 w-3.5" /> Publish</>
                        )}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleToggleFeatured(project.id)}>
                        <Star className="mr-2 h-3.5 w-3.5" />
                        {project.is_featured ? 'Unfeature' : 'Feature'}
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-destructive focus:text-destructive"
                        onClick={() => {
                          setDeleteId(project.id);
                          setDeleteTitle(project.title);
                        }}
                      >
                        <Trash2 className="mr-2 h-3.5 w-3.5" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {filteredProjects.length === 0 && projects.length > 0 && (
        <p className="text-center text-sm text-muted-foreground py-8">
          No projects match your search.
        </p>
      )}

      {/* Delete dialog */}
      <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Project</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete &quot;{deleteTitle}&quot;? This action is permanent
              and will also delete all associated images. This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isPending}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isPending ? 'Deleting...' : 'Delete Project'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
