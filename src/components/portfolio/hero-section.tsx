'use client';

import Link from 'next/link';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { Github, Linkedin } from '@/components/shared/icons';
import { Button } from '@/components/ui/button';
import { buildWhatsAppUrl } from '@/lib/utils/whatsapp';
import { useI18n } from '@/lib/i18n/context';
import type { ProfileSettings } from '@/types';

interface HeroSectionProps {
  profile: ProfileSettings | null;
}

export function HeroSection({ profile }: HeroSectionProps) {
  const { t, locale, isRtl } = useI18n();

  const isDefaultEnglishTitle =
    !profile?.professional_title ||
    profile.professional_title === 'Frontend Engineer | React Developer';
  const isDefaultEnglishHeadline =
    !profile?.hero_headline ||
    profile.hero_headline ===
      'Building Modern, Responsive, and User-Focused Web Experiences.';
  const isDefaultEnglishDesc =
    !profile?.hero_description ||
    profile.hero_description.includes('A passionate Frontend Engineer');
  const isDefaultEnglishName =
    !profile?.display_name || profile.display_name === 'Ahmed Zaki';

  const displayName =
    locale === 'ar'
      ? isDefaultEnglishName
        ? t.hero.name
        : profile?.display_name
      : profile?.display_name || t.hero.name;

  const professionalTitle =
    locale === 'ar'
      ? isDefaultEnglishTitle
        ? t.hero.defaultTitle
        : profile?.professional_title
      : profile?.professional_title || t.hero.defaultTitle;

  const heroHeadline =
    locale === 'ar'
      ? isDefaultEnglishHeadline
        ? t.hero.defaultHeadline
        : profile?.hero_headline
      : profile?.hero_headline || t.hero.defaultHeadline;

  const heroDescription =
    locale === 'ar'
      ? isDefaultEnglishDesc
        ? t.hero.defaultDescription
        : profile?.hero_description
      : profile?.hero_description || t.hero.defaultDescription;

  const whatsappUrl = profile?.whatsapp_number
    ? buildWhatsAppUrl(profile.whatsapp_number, profile.whatsapp_message)
    : null;

  return (
    <section className="relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-chart-2/5 rounded-full blur-3xl" />
      </div>

      <div className="container-wide py-24 md:py-32 lg:py-40">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          {/* Status badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/80 px-4 py-1.5 text-sm text-muted-foreground backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
            {t.hero.available}
          </div>

          {/* Name and role */}
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
              {displayName}
            </h1>
            <p className="text-lg sm:text-xl text-primary font-medium">
              {professionalTitle}
            </p>
          </div>

          {/* Headline */}
          <p className="text-xl sm:text-2xl lg:text-3xl font-semibold leading-relaxed gradient-text">
            {heroHeadline}
          </p>

          {/* Description */}
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {heroDescription}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" className="gap-2 min-w-[180px]">
              <Link href="/projects">
                {t.hero.viewProjects}
                <ArrowRight className={`h-4 w-4 ${isRtl ? 'rotate-180' : ''}`} />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="gap-2 min-w-[180px]">
              <Link href="/contact">
                {t.hero.contactMe}
              </Link>
            </Button>
          </div>

          {/* Social Links */}
          <div className="flex items-center justify-center gap-4 pt-4">
            {profile?.github_url && (
              <a
                href={profile.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors focus-ring rounded-md p-1"
                aria-label="GitHub profile"
              >
                <Github className="h-5 w-5" />
              </a>
            )}
            {profile?.linkedin_url && (
              <a
                href={profile.linkedin_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors focus-ring rounded-md p-1"
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
                className="text-muted-foreground hover:text-foreground transition-colors focus-ring rounded-md p-1"
                aria-label="Contact via WhatsApp"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
