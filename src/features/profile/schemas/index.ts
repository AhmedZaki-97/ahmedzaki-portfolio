import { z } from 'zod';

export const profileSettingsSchema = z.object({
  display_name: z
    .string()
    .min(1, 'Display name is required')
    .max(100, 'Display name must be 100 characters or less'),
  professional_title: z
    .string()
    .min(1, 'Professional title is required')
    .max(200, 'Professional title must be 200 characters or less'),
  hero_headline: z
    .string()
    .min(1, 'Headline is required')
    .max(300, 'Headline must be 300 characters or less'),
  hero_description: z
    .string()
    .min(1, 'Description is required')
    .max(1000, 'Description must be 1000 characters or less'),
  about_bio: z
    .string()
    .max(5000, 'Bio must be 5000 characters or less')
    .nullable()
    .optional()
    .transform(v => v || null),
  resume_url: z
    .string()
    .url('Must be a valid URL')
    .nullable()
    .optional()
    .or(z.literal(''))
    .transform(v => v || null),
  email: z
    .string()
    .email('Must be a valid email')
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
  linkedin_url: z
    .string()
    .url('Must be a valid URL')
    .nullable()
    .optional()
    .or(z.literal(''))
    .transform(v => v || null),
  whatsapp_number: z
    .string()
    .max(20, 'Phone number must be 20 characters or less')
    .nullable()
    .optional()
    .transform(v => v || null),
  whatsapp_message: z
    .string()
    .max(500, 'WhatsApp message must be 500 characters or less')
    .nullable()
    .optional()
    .transform(v => v || null),
  website_title: z
    .string()
    .max(200, 'Website title must be 200 characters or less')
    .nullable()
    .optional()
    .transform(v => v || null),
  seo_description: z
    .string()
    .max(500, 'SEO description must be 500 characters or less')
    .nullable()
    .optional()
    .transform(v => v || null),
  accent_color: z.string().default('blue'),
  default_theme: z.enum(['light', 'dark', 'system']).default('system'),
  footer_text: z
    .string()
    .max(500, 'Footer text must be 500 characters or less')
    .nullable()
    .optional()
    .transform(v => v || null),
  contact_section_content: z
    .string()
    .max(2000, 'Contact content must be 2000 characters or less')
    .nullable()
    .optional()
    .transform(v => v || null),
});

export type ProfileSettingsFormValues = z.infer<typeof profileSettingsSchema>;
