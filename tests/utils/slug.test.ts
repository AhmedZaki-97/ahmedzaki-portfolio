import { describe, it, expect } from 'vitest';
import { generateSlug, isValidSlug } from '@/lib/utils/slug';

describe('Slug Utilities', () => {
  describe('generateSlug', () => {
    it('should convert standard text to lowercased hyphenated slug', () => {
      expect(generateSlug('E-Commerce Dashboard')).toBe('e-commerce-dashboard');
      expect(generateSlug('My Awesome Project 2026')).toBe('my-awesome-project-2026');
    });

    it('should strip special characters and punctuation', () => {
      expect(generateSlug('Hello, World! @2026 #React')).toBe('hello-world-2026-react');
      expect(generateSlug('Ahmed Zaki — Full-Stack Portfolio')).toBe('ahmed-zaki-full-stack-portfolio');
    });

    it('should trim leading and trailing spaces or hyphens', () => {
      expect(generateSlug('   Leading & Trailing   ')).toBe('leading-trailing');
      expect(generateSlug('--already-hyphenated--')).toBe('already-hyphenated');
    });

    it('should collapse multiple spaces and underscores into a single hyphen', () => {
      expect(generateSlug('multiple___underscores   and   spaces')).toBe('multiple-underscores-and-spaces');
    });
  });

  describe('isValidSlug', () => {
    it('should return true for valid slugs', () => {
      expect(isValidSlug('my-project')).toBe(true);
      expect(isValidSlug('project-123')).toBe(true);
      expect(isValidSlug('portfolio')).toBe(true);
    });

    it('should return false for invalid slugs', () => {
      expect(isValidSlug('My-Project')).toBe(false); // uppercase
      expect(isValidSlug('my project')).toBe(false); // space
      expect(isValidSlug('-my-project')).toBe(false); // leading hyphen
      expect(isValidSlug('my-project-')).toBe(false); // trailing hyphen
      expect(isValidSlug('my--project')).toBe(false); // double hyphen
      expect(isValidSlug('my@project')).toBe(false); // special char
    });
  });
});
