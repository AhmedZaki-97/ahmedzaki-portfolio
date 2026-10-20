import { Mail, Github, Linkedin, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { buildWhatsAppUrl } from '@/lib/utils/whatsapp';
import type { ProfileSettings } from '@/types';

interface ContactSectionProps {
  profile: ProfileSettings | null;
}

export function ContactSection({ profile }: ContactSectionProps) {
  const whatsappUrl = profile?.whatsapp_number
    ? buildWhatsAppUrl(profile.whatsapp_number, profile.whatsapp_message)
    : null;

  return (
    <section className="py-20 md:py-28">
      <div className="container-narrow text-center">
        <div className="space-y-6">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Get In Touch
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            {profile?.contact_section_content ||
              'I am always interested in connecting with fellow developers and discussing new opportunities. Feel free to reach out!'}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            {whatsappUrl && (
              <Button asChild size="lg" className="gap-2 min-w-[200px]">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp Me
                </a>
              </Button>
            )}
            {profile?.email && (
              <Button asChild variant="outline" size="lg" className="gap-2 min-w-[200px]">
                <a href={`mailto:${profile.email}`}>
                  <Mail className="h-4 w-4" />
                  Send Email
                </a>
              </Button>
            )}
          </div>

          {/* Social links */}
          <div className="flex items-center justify-center gap-6 pt-4">
            {profile?.github_url && (
              <a
                href={profile.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                aria-label="GitHub profile"
              >
                <Github className="h-5 w-5" />
                GitHub
              </a>
            )}
            {profile?.linkedin_url && (
              <a
                href={profile.linkedin_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                aria-label="LinkedIn profile"
              >
                <Linkedin className="h-5 w-5" />
                LinkedIn
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
