'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, useWatch, type Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import {
  Loader2,
  Save,
  Eye,
  X,
  Plus,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { projectFormSchema, type ProjectFormValues } from '@/features/projects/schemas';
import { createProject, updateProject } from '@/features/projects/actions';
import { generateSlug } from '@/lib/utils/slug';
import { projectCategories, technologyOptions } from '@/lib/constants/site';
import type { Project } from '@/types';

interface ProjectFormProps {
  project?: Project;
}

export function ProjectForm({ project }: ProjectFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [newTech, setNewTech] = useState('');
  const [newFeature, setNewFeature] = useState('');

  const isEditing = !!project;

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectFormSchema) as Resolver<ProjectFormValues>,
    defaultValues: {
      title: project?.title || '',
      slug: project?.slug || '',
      short_description: project?.short_description || '',
      description: project?.description || '',
      category: project?.category || '',
      technologies: project?.technologies || [],
      live_url: project?.live_url || '',
      github_url: project?.github_url || '',
      status: project?.status || 'draft',
      is_featured: project?.is_featured || false,
      display_order: project?.display_order || 0,
      features: project?.features || [],
      challenges: project?.challenges || '',
      solutions: project?.solutions || '',
    },
  });

  const { register, handleSubmit, formState: { errors }, setValue, control } = form;

  const technologies = useWatch({ control, name: 'technologies' }) || [];
  const features = useWatch({ control, name: 'features' }) || [];
  const status = useWatch({ control, name: 'status' });
  const isFeatured = useWatch({ control, name: 'is_featured' });
  const slug = useWatch({ control, name: 'slug' }) || '';
  const shortDescription = useWatch({ control, name: 'short_description' }) || '';
  const category = useWatch({ control, name: 'category' }) || '';

  function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newTitle = e.target.value;
    setValue('title', newTitle);
    if (!isEditing || !project?.slug) {
      setValue('slug', generateSlug(newTitle));
    }
  }

  function addTechnology(tech: string) {
    const trimmed = tech.trim();
    if (trimmed && !technologies.includes(trimmed)) {
      setValue('technologies', [...technologies, trimmed]);
    }
    setNewTech('');
  }

  function removeTechnology(tech: string) {
    setValue('technologies', technologies.filter((t) => t !== tech));
  }

  function addFeature(feature: string) {
    const trimmed = feature.trim();
    if (trimmed) {
      setValue('features', [...features, trimmed]);
    }
    setNewFeature('');
  }

  function removeFeature(index: number) {
    setValue('features', features.filter((_, i) => i !== index));
  }

  function onSubmit(data: ProjectFormValues) {
    startTransition(async () => {
      const result = isEditing
        ? await updateProject(project!.id, data)
        : await createProject(data);

      if (result.success) {
        toast.success(isEditing ? 'Project updated successfully' : 'Project created successfully');
        router.push('/admin/projects');
        router.refresh();
      } else {
        toast.error(result.error || 'Something went wrong');
      }
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">
                Title <span className="text-destructive">*</span>
              </Label>
              <Input
                id="title"
                {...register('title')}
                onChange={handleTitleChange}
                placeholder="My Awesome Project"
                disabled={isPending}
              />
              {errors.title && (
                <p className="text-xs text-destructive">{errors.title.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">
                Slug <span className="text-destructive">*</span>
              </Label>
              <Input
                id="slug"
                {...register('slug')}
                placeholder="my-awesome-project"
                disabled={isPending}
              />
              {errors.slug && (
                <p className="text-xs text-destructive">{errors.slug.message}</p>
              )}
              <p className="text-xs text-muted-foreground">URL: /projects/{slug || '...'}</p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="short_description">
              Short Description <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="short_description"
              {...register('short_description')}
              placeholder="A brief description for the project card..."
              rows={2}
              disabled={isPending}
            />
            {errors.short_description && (
              <p className="text-xs text-destructive">{errors.short_description.message}</p>
            )}
            <p className="text-xs text-muted-foreground">
              {shortDescription.length}/300
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">
              Category <span className="text-destructive">*</span>
            </Label>
            <Select
              value={category}
              onValueChange={(value) => setValue('category', value || '')}
              disabled={isPending}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {projectCategories.map((cat) => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.category && (
              <p className="text-xs text-destructive">{errors.category.message}</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Description */}
      <Card>
        <CardHeader>
          <CardTitle>Description</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="description">Full Description</Label>
            <Textarea
              id="description"
              {...register('description')}
              placeholder="Detailed description of the project. Use separate paragraphs for different sections."
              rows={8}
              disabled={isPending}
            />
            {errors.description && (
              <p className="text-xs text-destructive">{errors.description.message}</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Technologies */}
      <Card>
        <CardHeader>
          <CardTitle>Technologies</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech) => (
              <Badge key={tech} variant="secondary" className="gap-1 pr-1">
                {tech}
                <button
                  type="button"
                  onClick={() => removeTechnology(tech)}
                  className="ml-1 hover:text-destructive"
                  aria-label={`Remove ${tech}`}
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>

          <div className="flex gap-2">
            <Select
              value=""
              onValueChange={(value) => { if (value) addTechnology(value); }}
              disabled={isPending}
            >
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Select technology..." />
              </SelectTrigger>
              <SelectContent>
                {technologyOptions
                  .filter((t) => !technologies.includes(t))
                  .map((tech) => (
                    <SelectItem key={tech} value={tech}>{tech}</SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2">
            <Input
              placeholder="Or type a custom technology..."
              value={newTech}
              onChange={(e) => setNewTech(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addTechnology(newTech);
                }
              }}
              disabled={isPending}
            />
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => addTechnology(newTech)}
              disabled={!newTech.trim() || isPending}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Links */}
      <Card>
        <CardHeader>
          <CardTitle>Links</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="live_url">Live Demo URL</Label>
              <Input
                id="live_url"
                {...register('live_url')}
                placeholder="https://example.com"
                type="url"
                disabled={isPending}
              />
              {errors.live_url && (
                <p className="text-xs text-destructive">{errors.live_url.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="github_url">GitHub Repository URL</Label>
              <Input
                id="github_url"
                {...register('github_url')}
                placeholder="https://github.com/username/repo"
                type="url"
                disabled={isPending}
              />
              {errors.github_url && (
                <p className="text-xs text-destructive">{errors.github_url.message}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Features & Challenges */}
      <Card>
        <CardHeader>
          <CardTitle>Features & Challenges</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <Label>Key Features</Label>
            {features.length > 0 && (
              <ul className="space-y-2">
                {features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm bg-muted/50 rounded-md px-3 py-2">
                    <span className="flex-1">{feature}</span>
                    <button
                      type="button"
                      onClick={() => removeFeature(i)}
                      className="text-muted-foreground hover:text-destructive shrink-0"
                      aria-label={`Remove feature`}
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
            <div className="flex gap-2">
              <Input
                placeholder="Add a feature..."
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addFeature(newFeature);
                  }
                }}
                disabled={isPending}
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => addFeature(newFeature)}
                disabled={!newFeature.trim() || isPending}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="challenges">Challenges</Label>
              <Textarea
                id="challenges"
                {...register('challenges')}
                placeholder="What challenges did you face?"
                rows={4}
                disabled={isPending}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="solutions">Solutions</Label>
              <Textarea
                id="solutions"
                {...register('solutions')}
                placeholder="How did you solve them?"
                rows={4}
                disabled={isPending}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Publishing Options */}
      <Card>
        <CardHeader>
          <CardTitle>Publishing Options</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Status</Label>
              <p className="text-xs text-muted-foreground">
                {status === 'published'
                  ? 'This project is visible on your portfolio.'
                  : 'This project is saved as a draft and hidden from the public.'}
              </p>
            </div>
            <Select
              value={status}
              onValueChange={(value) => setValue('status', value as 'draft' | 'published')}
              disabled={isPending}
            >
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="published">Published</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="is_featured">Featured</Label>
              <p className="text-xs text-muted-foreground">
                Featured projects appear on the homepage.
              </p>
            </div>
            <Switch
              id="is_featured"
              checked={isFeatured}
              onCheckedChange={(checked) => setValue('is_featured', checked)}
              disabled={isPending}
            />
          </div>

          <Separator />

          <div className="space-y-2">
            <Label htmlFor="display_order">Display Order</Label>
            <Input
              id="display_order"
              type="number"
              {...register('display_order')}
              className="w-24"
              min={0}
              disabled={isPending}
            />
            <p className="text-xs text-muted-foreground">
              Lower numbers appear first. Default is 0.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex items-center justify-between gap-4 pt-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          disabled={isPending}
        >
          Cancel
        </Button>
        <div className="flex gap-3">
          {isEditing && project?.status === 'published' && (
            <Button type="button" variant="outline" className="gap-2" asChild>
              <a href={`/projects/${slug}`} target="_blank" rel="noopener noreferrer">
                <Eye className="h-4 w-4" />
                Preview
              </a>
            </Button>
          )}
          <Button type="submit" disabled={isPending} className="gap-2 min-w-[140px]">
            {isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Save className="h-4 w-4" />
            )}
            {isPending
              ? 'Saving...'
              : isEditing
                ? 'Update Project'
                : 'Create Project'}
          </Button>
        </div>
      </div>
    </form>
  );
}
