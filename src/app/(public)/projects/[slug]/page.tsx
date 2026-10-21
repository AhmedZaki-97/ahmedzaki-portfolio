import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Calendar } from 'lucide-react';
import { Github } from '@/components/shared/icons';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ProjectCard } from '@/components/portfolio/project-card';
import { getProjectBySlug, getRelatedProjects } from '@/features/projects/services';

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata(
  props: ProjectPageProps
): Promise<Metadata> {
  const params = await props.params;
  const project = await getProjectBySlug(params.slug);
  if (!project) return { title: 'Project Not Found' };

  return {
    title: project.title,
    description: project.short_description,
    openGraph: {
      title: project.title,
      description: project.short_description,
      type: 'article',
      images: project.thumbnail_path ? [{ url: project.thumbnail_path }] : [],
    },
  };
}

export default async function ProjectDetailPage(
  props: ProjectPageProps
) {
  const params = await props.params;
  const project = await getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  const relatedProjects = await getRelatedProjects(
    project.slug,
    project.category
  );

  const formattedDate = project.published_at
    ? new Date(project.published_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null;

  return (
    <article className="py-12 md:py-20">
      <div className="container-narrow">
        {/* Back button */}
        <Button asChild variant="ghost" className="gap-2 mb-8 -ml-3">
          <Link href="/projects">
            <ArrowLeft className="h-4 w-4" />
            Back to Projects
          </Link>
        </Button>

        {/* Header */}
        <div className="space-y-4 mb-8">
          <div className="flex flex-wrap items-center gap-2">
            <Badge>{project.category}</Badge>
            {formattedDate && (
              <span className="flex items-center gap-1 text-sm text-muted-foreground">
                <Calendar className="h-3.5 w-3.5" />
                {formattedDate}
              </span>
            )}
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            {project.title}
          </h1>
          <p className="text-lg text-muted-foreground">
            {project.short_description}
          </p>
        </div>

        {/* Action Links */}
        <div className="flex flex-wrap gap-3 mb-10">
          {project.live_url && (
            <Button asChild className="gap-2">
              <a
                href={project.live_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="h-4 w-4" />
                Live Demo
              </a>
            </Button>
          )}
          {project.github_url && (
            <Button asChild variant="outline" className="gap-2">
              <a
                href={project.github_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-4 w-4" />
                Source Code
              </a>
            </Button>
          )}
        </div>

        {/* Thumbnail */}
        {project.thumbnail_path && (
          <div className="relative aspect-video rounded-xl overflow-hidden bg-muted mb-10 border border-border/50">
            <Image
              src={project.thumbnail_path}
              alt={project.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 800px"
            />
          </div>
        )}

        {/* Description */}
        {project.description && (
          <div className="mb-10">
            <h2 className="text-xl font-semibold mb-4">About This Project</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              {project.description.split('\n\n').map((paragraph, i) => (
                <p key={i} className="text-muted-foreground leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        )}

        {/* Technologies */}
        {project.technologies.length > 0 && (
          <div className="mb-10">
            <h2 className="text-xl font-semibold mb-4">Technologies Used</h2>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <Badge key={tech} variant="secondary" className="px-3 py-1">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Features */}
        {project.features && project.features.length > 0 && (
          <div className="mb-10">
            <h2 className="text-xl font-semibold mb-4">Key Features</h2>
            <ul className="space-y-2">
              {project.features.map((feature, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-muted-foreground"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Challenges & Solutions */}
        {(project.challenges || project.solutions) && (
          <div className="mb-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            {project.challenges && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-3">Challenges</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {project.challenges}
                  </p>
                </CardContent>
              </Card>
            )}
            {project.solutions && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-3">Solutions</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {project.solutions}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Gallery */}
        {project.gallery_paths && project.gallery_paths.length > 0 && (
          <div className="mb-10">
            <h2 className="text-xl font-semibold mb-4">Screenshots</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {project.gallery_paths.map((path, i) => (
                <div
                  key={i}
                  className="relative aspect-video rounded-lg overflow-hidden bg-muted border border-border/50"
                >
                  <Image
                    src={path}
                    alt={`${project.title} screenshot ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 400px"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Related Projects */}
        {relatedProjects.length > 0 && (
          <>
            <Separator className="my-12" />
            <div>
              <h2 className="text-2xl font-bold mb-6">Related Projects</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedProjects.map((p) => (
                  <ProjectCard key={p.id} project={p} />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </article>
  );
}
