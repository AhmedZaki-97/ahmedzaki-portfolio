'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Loader2,
  GripVertical,
  Wrench,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
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
import { skillFormSchema, type SkillFormValues } from '@/features/skills/schemas';
import { createSkill, updateSkill, deleteSkill, toggleSkillVisibility } from '@/features/skills/actions';
import type { Skill } from '@/types';

interface SkillsManagerProps {
  skills: Skill[];
}

export function SkillsManager({ skills }: SkillsManagerProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteName, setDeleteName] = useState('');

  const form = useForm<SkillFormValues>({
    resolver: zodResolver(skillFormSchema),
    defaultValues: {
      name: '',
      category: '',
      proficiency_label: '',
      is_visible: true,
      display_order: 0,
      icon_name: '',
    },
  });

  const { register, handleSubmit, formState: { errors }, reset, setValue } = form;

  // Group skills by category
  const grouped = skills.reduce<Record<string, Skill[]>>((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {});

  function openCreateDialog() {
    setEditingSkill(null);
    reset({
      name: '',
      category: '',
      proficiency_label: '',
      is_visible: true,
      display_order: 0,
      icon_name: '',
    });
    setDialogOpen(true);
  }

  function openEditDialog(skill: Skill) {
    setEditingSkill(skill);
    reset({
      name: skill.name,
      category: skill.category,
      proficiency_label: skill.proficiency_label || '',
      is_visible: skill.is_visible,
      display_order: skill.display_order,
      icon_name: skill.icon_name || '',
    });
    setDialogOpen(true);
  }

  function onSubmit(data: SkillFormValues) {
    startTransition(async () => {
      const result = editingSkill
        ? await updateSkill(editingSkill.id, data)
        : await createSkill(data);

      if (result.success) {
        toast.success(editingSkill ? 'Skill updated' : 'Skill created');
        setDialogOpen(false);
        reset();
        router.refresh();
      } else {
        toast.error(result.error || 'Something went wrong');
      }
    });
  }

  function handleToggleVisibility(id: string) {
    startTransition(async () => {
      const result = await toggleSkillVisibility(id);
      if (result.success) {
        toast.success('Visibility updated');
        router.refresh();
      } else {
        toast.error(result.error || 'Failed to update');
      }
    });
  }

  function handleDelete() {
    if (!deleteId) return;
    startTransition(async () => {
      const result = await deleteSkill(deleteId);
      if (result.success) {
        toast.success('Skill deleted');
        setDeleteId(null);
        router.refresh();
      } else {
        toast.error(result.error || 'Failed to delete');
      }
    });
  }

  return (
    <>
      <div className="flex justify-end">
        <Button onClick={openCreateDialog} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Skill
        </Button>
      </div>

      {skills.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-border rounded-lg">
          <Wrench className="mx-auto h-12 w-12 text-muted-foreground/40" />
          <h3 className="mt-4 text-lg font-semibold">No skills yet</h3>
          <p className="text-muted-foreground mt-1">Add your first skill to get started.</p>
          <Button onClick={openCreateDialog} className="mt-4 gap-2">
            <Plus className="h-4 w-4" />
            Add Skill
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(grouped)
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([category, categorySkills]) => (
              <Card key={category}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-semibold text-primary uppercase tracking-wider">
                    {category}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {categorySkills
                    .sort((a, b) => a.display_order - b.display_order)
                    .map((skill) => (
                      <div
                        key={skill.id}
                        className="flex items-center gap-3 rounded-lg border border-border/50 px-3 py-2.5 hover:bg-accent/50 transition-colors"
                      >
                        <GripVertical className="h-4 w-4 text-muted-foreground/40 shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">{skill.name}</span>
                            {skill.proficiency_label && (
                              <Badge variant="outline" className="text-[10px]">
                                {skill.proficiency_label}
                              </Badge>
                            )}
                            {!skill.is_visible && (
                              <Badge variant="secondary" className="text-[10px]">
                                Hidden
                              </Badge>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-1 shrink-0">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => handleToggleVisibility(skill.id)}
                            disabled={isPending}
                            aria-label={skill.is_visible ? 'Hide skill' : 'Show skill'}
                          >
                            {skill.is_visible ? (
                              <Eye className="h-3.5 w-3.5 text-muted-foreground" />
                            ) : (
                              <EyeOff className="h-3.5 w-3.5 text-muted-foreground" />
                            )}
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => openEditDialog(skill)}
                            disabled={isPending}
                            aria-label="Edit skill"
                          >
                            <Edit className="h-3.5 w-3.5 text-muted-foreground" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => {
                              setDeleteId(skill.id);
                              setDeleteName(skill.name);
                            }}
                            disabled={isPending}
                            aria-label="Delete skill"
                          >
                            <Trash2 className="h-3.5 w-3.5 text-muted-foreground hover:text-destructive" />
                          </Button>
                        </div>
                      </div>
                    ))}
                </CardContent>
              </Card>
            ))}
        </div>
      )}

      {/* Create/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingSkill ? 'Edit Skill' : 'Add Skill'}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="skill-name">
                Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="skill-name"
                {...register('name')}
                placeholder="React"
                disabled={isPending}
              />
              {errors.name && (
                <p className="text-xs text-destructive">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="skill-category">
                Category <span className="text-destructive">*</span>
              </Label>
              <Input
                id="skill-category"
                {...register('category')}
                placeholder="Frameworks & Libraries"
                disabled={isPending}
              />
              {errors.category && (
                <p className="text-xs text-destructive">{errors.category.message}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="skill-proficiency">Proficiency Label</Label>
                <Input
                  id="skill-proficiency"
                  {...register('proficiency_label')}
                  placeholder="e.g. Intermediate"
                  disabled={isPending}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="skill-order">Display Order</Label>
                <Input
                  id="skill-order"
                  type="number"
                  {...register('display_order')}
                  min={0}
                  disabled={isPending}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="skill-visible">Visible on portfolio</Label>
              <Switch
                id="skill-visible"
                checked={form.watch('is_visible')}
                onCheckedChange={(checked) => setValue('is_visible', checked)}
                disabled={isPending}
              />
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setDialogOpen(false)}
                disabled={isPending}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isPending} className="gap-2">
                {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
                {editingSkill ? 'Update' : 'Create'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Skill</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete &quot;{deleteName}&quot;? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isPending}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isPending ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
