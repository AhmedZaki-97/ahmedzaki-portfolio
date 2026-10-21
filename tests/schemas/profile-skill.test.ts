import { describe, it, expect } from 'vitest';
import { profileSettingsSchema } from '@/features/profile/schemas';
import { skillFormSchema } from '@/features/skills/schemas';

describe('Profile and Skill Schema Validation', () => {
  describe('Profile Settings Schema', () => {
    const validProfile = {
      display_name: 'Ahmed Zaki',
      professional_title: 'Frontend Engineer | React Developer',
      hero_headline: 'Building Modern, Responsive, and User-Focused Web Experiences.',
      hero_description: 'A passionate Frontend Engineer specializing in React and modern web development.',
      about_bio: 'My journey in web development...',
      resume_url: 'https://example.com/resume.pdf',
      email: 'ahmed@example.com',
      github_url: 'https://github.com/ahmedzaki',
      linkedin_url: 'https://linkedin.com/in/ahmedzaki',
      whatsapp_number: '+201001234567',
      whatsapp_message: 'Hello Ahmed! I found your portfolio.',
      website_title: 'Ahmed Zaki — Frontend Engineer',
      seo_description: 'Portfolio of Ahmed Zaki, Frontend Engineer specializing in React.',
      accent_color: 'blue',
      default_theme: 'system' as const,
      footer_text: 'Crafted with passion.',
      contact_section_content: 'Feel free to reach out!',
    };

    it('should validate complete profile data', () => {
      const result = profileSettingsSchema.safeParse(validProfile);
      expect(result.success).toBe(true);
    });

    it('should require display_name, title, headline, and description', () => {
      expect(profileSettingsSchema.safeParse({ ...validProfile, display_name: '' }).success).toBe(false);
      expect(profileSettingsSchema.safeParse({ ...validProfile, professional_title: '' }).success).toBe(false);
      expect(profileSettingsSchema.safeParse({ ...validProfile, hero_headline: '' }).success).toBe(false);
      expect(profileSettingsSchema.safeParse({ ...validProfile, hero_description: '' }).success).toBe(false);
    });

    it('should validate email format if provided', () => {
      expect(profileSettingsSchema.safeParse({ ...validProfile, email: 'invalid-email' }).success).toBe(false);
      expect(profileSettingsSchema.safeParse({ ...validProfile, email: '' }).success).toBe(true);
    });
  });

  describe('Skill Form Schema', () => {
    it('should validate valid skill', () => {
      const result = skillFormSchema.safeParse({
        name: 'React',
        category: 'Frameworks & Libraries',
        proficiency_label: 'Intermediate',
        is_visible: true,
        display_order: 1,
      });
      expect(result.success).toBe(true);
    });

    it('should require name and category', () => {
      expect(skillFormSchema.safeParse({ name: '', category: 'Tools' }).success).toBe(false);
      expect(skillFormSchema.safeParse({ name: 'Git', category: '' }).success).toBe(false);
    });

    it('should default is_visible to true and display_order to 0', () => {
      const result = skillFormSchema.safeParse({
        name: 'TypeScript',
        category: 'Frontend Fundamentals',
      });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.is_visible).toBe(true);
        expect(result.data.display_order).toBe(0);
      }
    });
  });
});
