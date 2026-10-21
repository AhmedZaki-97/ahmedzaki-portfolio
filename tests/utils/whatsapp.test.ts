import { describe, it, expect } from 'vitest';
import { formatWhatsAppNumber, buildWhatsAppUrl, isValidWhatsAppNumber } from '@/lib/utils/whatsapp';

describe('WhatsApp Utilities', () => {
  describe('formatWhatsAppNumber', () => {
    it('should strip non-digits like +, spaces, dashes, parentheses', () => {
      expect(formatWhatsAppNumber('+1 (555) 123-4567')).toBe('15551234567');
      expect(formatWhatsAppNumber('+20 100 123 4567')).toBe('201001234567');
    });

    it('should properly format Egyptian 11-digit numbers starting with 0', () => {
      expect(formatWhatsAppNumber('01012345678')).toBe('201012345678');
      expect(formatWhatsAppNumber('01234567890')).toBe('201234567890');
    });

    it('should preserve international numbers already with country code', () => {
      expect(formatWhatsAppNumber('201012345678')).toBe('201012345678');
      expect(formatWhatsAppNumber('447911123456')).toBe('447911123456');
    });
  });

  describe('buildWhatsAppUrl', () => {
    it('should generate a valid wa.me URL without message', () => {
      expect(buildWhatsAppUrl('01012345678')).toBe('https://wa.me/201012345678');
    });

    it('should encode custom chat message using encodeURIComponent', () => {
      const url = buildWhatsAppUrl('01012345678', 'Hello Ahmed! I saw your portfolio & would love to chat.');
      expect(url).toContain('https://wa.me/201012345678?text=');
      expect(url).toContain(encodeURIComponent('Hello Ahmed! I saw your portfolio & would love to chat.'));
    });
  });

  describe('isValidWhatsAppNumber', () => {
    it('should validate typical phone numbers between 10 and 15 digits', () => {
      expect(isValidWhatsAppNumber('01012345678')).toBe(true);
      expect(isValidWhatsAppNumber('+20 100 123 4567')).toBe(true);
      expect(isValidWhatsAppNumber('12345')).toBe(false); // too short
      expect(isValidWhatsAppNumber('12345678901234567890')).toBe(false); // too long
    });
  });
});
