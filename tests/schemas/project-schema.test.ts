import { describe, it, expect } from 'vitest';
import { projectFormSchema } from '@/features/projects/schemas';

describe('Project Form Schema Validation', () => {
  const validProject = {
    title: 'Modern Portfolio',
    slug: 'modern-portfolio',
    short_description: 'A responsive developer portfolio built with Next.js and Tailwind CSS.',
    description: 'Detailed description about the architecture and performance considerations.',
    category: 'Portfolio',
    technologies: ['React', 'Next.js', 'Tailwind CSS', 'TypeScript'],
    live_url: 'https://example.com',
    github_url: 'https://github.com/example/portfolio',
    status: 'published' as const,
    is_featured: true,
    display_order: 1,
    features: ['Dark mode support', 'Supabase backend', 'Responsive UI'],
    challenges: 'Ensuring zero layout shifts and high accessibility scores.',
    solutions: 'Applied CSS contain and semantic HTML elements throughout.',
  };

  it('should accept valid project data', () => {
    const result = projectFormSchema.safeParse(validProject);
    expect(result.success).toBe(true);
  });

  it('should require a non-empty title', () => {
    const result = projectFormSchema.safeParse({ ...validProject, title: '' });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.errors[0]?.message).toBe('Title is required');
    }
  });

  it('should reject invalid slug formats', () => {
    const result = projectFormSchema.safeParse({ ...validProject, slug: 'Invalid Slug With Spaces' });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.errors[0]?.message).toContain('Slug must contain only lowercase');
    }
  });

  it('should reject invalid URL strings', () => {
    const result = projectFormSchema.safeParse({ ...validProject, live_url: 'not-a-valid-url' });
    expect(result.success).toBe(false);
  });

  it('should transform empty string URLs to null', () => {
    const result = projectFormSchema.safeParse({ ...validProject, live_url: '', github_url: '' });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.live_url).toBeNull();
      expect(result.data.github_url).toBeNull();
    }
  });

  it('should enforce status to draft or published', () => {
    const result = projectFormSchema.safeParse({ ...validProject, status: 'archived' });
    expect(result.success).toBe(false);
  });
});
