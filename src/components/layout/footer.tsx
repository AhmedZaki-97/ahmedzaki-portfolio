import Link from 'next/link';
import { Github, Linkedin, MessageCircle, Heart } from 'lucide-react';
import { navLinks } from '@/lib/constants/site';
import { buildWhatsAppUrl } from '@/lib/utils/whatsapp';

interface FooterProps {
  profileSettings?: {
    display_name?: string;
    github_url?: string | null;
    linkedin_url?: string | null;
    whatsapp_number?: string | null;
    whatsapp_message?: string | null;
    footer_text?: string | null;
  } | null;
}

export function Footer({ profileSettings }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const whatsappUrl = profileSettings?.whatsapp_number
    ? buildWhatsAppUrl(profileSettings.whatsapp_number, profileSettings.whatsapp_message)
    : null;

  return (
    <footer className="border-t border-border/50 bg-card/50">
      <div className="container-wide py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-3">
            <Link href="/" className="text-lg font-bold tracking-tight">
              Ahmed<span className="text-primary">Zaki</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              {profileSettings?.footer_text ||
                'Crafted with passion and modern web technologies.'}
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Quick Links</h4>
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Social Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Connect</h4>
            <div className="flex items-center gap-3">
              {profileSettings?.github_url && (
                <a
                  href={profileSettings.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="GitHub profile"
                >
                  <Github className="h-5 w-5" />
                </a>
              )}
              {profileSettings?.linkedin_url && (
                <a
                  href={profileSettings.linkedin_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="LinkedIn profile"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              )}
              {whatsappUrl && (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Contact via WhatsApp"
                >
                  <MessageCircle className="h-5 w-5" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 pt-6 border-t border-border/50">
          <p className="text-xs text-muted-foreground text-center">
            &copy; {currentYear} {profileSettings?.display_name || 'Ahmed Zaki'}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
