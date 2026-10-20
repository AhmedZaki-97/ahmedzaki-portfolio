import { z } from 'zod';

export const skillFormSchema = z.object({
  name: z
    .string()
    .min(1, 'Skill name is required')
    .max(100, 'Skill name must be 100 characters or less'),
  category: z
    .string()
    .min(1, 'Category is required')
    .max(100, 'Category must be 100 characters or less'),
  proficiency_label: z
    .string()
    .max(50, 'Proficiency label must be 50 characters or less')
    .nullable()
    .optional()
    .transform(v => v || null),
  is_visible: z.boolean().default(true),
  display_order: z.coerce.number().int().min(0).default(0),
  icon_name: z
    .string()
    .max(50, 'Icon name must be 50 characters or less')
    .nullable()
    .optional()
    .transform(v => v || null),
});

export type SkillFormValues = z.infer<typeof skillFormSchema>;
