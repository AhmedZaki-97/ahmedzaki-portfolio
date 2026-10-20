'use client';

import { MessageCircle } from 'lucide-react';
import { buildWhatsAppUrl } from '@/lib/utils/whatsapp';

interface WhatsAppFabProps {
  phoneNumber: string;
  message?: string | null;
}

export function WhatsAppFab({ phoneNumber, message }: WhatsAppFabProps) {
  const url = buildWhatsAppUrl(phoneNumber, message);

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contact via WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-all hover:scale-110 hover:shadow-xl focus-ring"
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  );
}
