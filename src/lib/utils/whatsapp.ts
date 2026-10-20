/**
 * Formats a phone number for WhatsApp API.
 * Strips +, spaces, dashes. For Egyptian numbers, removes leading 0 and adds country code 20.
 */
export function formatWhatsAppNumber(phone: string): string {
  // Remove all non-digit characters
  let cleaned = phone.replace(/\D/g, '');

  // Handle Egyptian numbers: if starts with 0, remove it and add 20
  if (cleaned.startsWith('0') && cleaned.length === 11) {
    cleaned = '20' + cleaned.substring(1);
  }

  return cleaned;
}

/**
 * Builds a WhatsApp chat URL.
 */
export function buildWhatsAppUrl(
  phoneNumber: string,
  message?: string | null
): string {
  const formattedNumber = formatWhatsAppNumber(phoneNumber);
  let url = `https://wa.me/${formattedNumber}`;

  if (message) {
    url += `?text=${encodeURIComponent(message)}`;
  }

  return url;
}

/**
 * Validates that a phone number looks valid for WhatsApp.
 */
export function isValidWhatsAppNumber(phone: string): boolean {
  const cleaned = phone.replace(/\D/g, '');
  return cleaned.length >= 10 && cleaned.length <= 15;
}
