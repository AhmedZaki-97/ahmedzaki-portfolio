import { z } from 'zod';

export const projectFormSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(200, 'Title must be 200 characters or less'),
  slug: z
    .string()
    .min(1, 'Slug is required')
    .max(200, 'Slug must be 200 characters or less')
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must contain only lowercase letters, numbers, and hyphens'),
  short_description: z
    .string()
    .min(1, 'Short description is required')
    .max(300, 'Short description must be 300 characters or less'),
  description: z
    .string()
    .max(10000, 'Description must be 10000 characters or less')
    .nullable()
    .optional()
    .transform(v => v || null),
  category: z.string().min(1, 'Category is required'),
  technologies: z.array(z.string()).default([]),
  live_url: z
    .string()
    .url('Must be a valid URL')
    .nullable()
    .optional()
    .or(z.literal(''))
    .transform(v => v || null),
  github_url: z
    .string()
    .url('Must be a valid URL')
    .nullable()
    .optional()
    .or(z.literal(''))
    .transform(v => v || null),
  status: z.enum(['draft', 'published']).default('draft'),
  is_featured: z.boolean().default(false),
  display_order: z.coerce.number().int().min(0).default(0),
  features: z.array(z.string()).default([]),
  challenges: z
    .string()
    .max(5000, 'Challenges must be 5000 characters or less')
    .nullable()
    .optional()
    .transform(v => v || null),
  solutions: z
    .string()
    .max(5000, 'Solutions must be 5000 characters or less')
    .nullable()
    .optional()
    .transform(v => v || null),
});

export type ProjectFormValues = z.infer<typeof projectFormSchema>;
