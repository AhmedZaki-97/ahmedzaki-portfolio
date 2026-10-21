'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  Code2,
  Sparkles,
  ArrowRight,
  MessageCircle,
  Mail,
  Download,
  CheckCircle2,
  Layers,
  Zap,
} from 'lucide-react';
import { Github, Linkedin } from '@/components/shared/icons';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SkillsSection } from '@/components/portfolio/skills-section';
import { buildWhatsAppUrl } from '@/lib/utils/whatsapp';
import { useI18n } from '@/lib/i18n/context';
import type { ProfileSettings, Skill } from '@/types';

interface AboutContentProps {
  profile: ProfileSettings | null;
  skills: Skill[];
}

export function AboutContent({ profile, skills }: AboutContentProps) {
  const { t, locale, isRtl } = useI18n();

  const isDefaultEnglishTitle =
    !profile?.professional_title ||
    profile.professional_title === 'Frontend Engineer | React Developer';
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

  const photoSrc = profile?.profile_image_path || '/images/profile.jpg';

  const bio =
    profile?.about_bio && locale === 'en'
      ? profile.about_bio
      : t.about.defaultBio;

  const whatsappUrl = profile?.whatsapp_number
    ? buildWhatsAppUrl(profile.whatsapp_number, profile.whatsapp_message)
    : null;

  return (
    <>
      <section className="relative overflow-hidden py-16 md:py-24">
        {/* Subtle background ambient gradients */}
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute top-10 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-60" />
          <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-chart-2/10 rounded-full blur-3xl opacity-50" />
        </div>

        <div className="container-wide">
          {/* Header Tag */}
          <div className="flex items-center gap-2 mb-8">
            <Badge
              variant="outline"
              className="px-3 py-1 gap-1.5 text-xs font-medium tracking-wide uppercase border-primary/30 bg-primary/5 text-primary"
            >
              <Sparkles className="h-3.5 w-3.5" />
              {t.about.badge}
            </Badge>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column: Profile Photo Card */}
            <div className="lg:col-span-5 lg:sticky lg:top-24">
              <div className="relative group">
                {/* Glow backdrop effect */}
                <div className="absolute -inset-1.5 bg-gradient-to-tr from-primary/40 via-chart-2/30 to-primary/20 rounded-3xl blur-xl opacity-70 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Card Container */}
                <div className="relative overflow-hidden rounded-2xl border border-border/80 bg-card shadow-2xl">
                  {/* Photo Frame */}
                  <div className="relative aspect-[3/4] w-full overflow-hidden bg-muted">
                    <Image
                      src={photoSrc}
                      alt={displayName}
                      fill
                      priority
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 40vw, 480px"
                      className="object-cover object-top transition duration-500 group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />

                    {/* Floating pill badge on photo */}
                    <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-background/85 backdrop-blur-md border border-border/60 shadow-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-semibold text-foreground">
                            {displayName}
                          </p>
                          <p className="text-xs text-primary font-medium">
                            {professionalTitle}
                          </p>
                        </div>
                        <span className="inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-medium bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20">
                          <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                          {t.about.availableBadge}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Social links & Quick connect under photo */}
                  <div className="p-4 border-t border-border/50 bg-card/60 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      {profile?.github_url && (
                        <Button
                          asChild
                          variant="ghost"
                          size="icon"
                          className="h-9 w-9 text-muted-foreground hover:text-foreground"
                        >
                          <a
                            href={profile.github_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="GitHub profile"
                          >
                            <Github className="h-4 w-4" />
                          </a>
                        </Button>
                      )}
                      {profile?.linkedin_url && (
                        <Button
                          asChild
                          variant="ghost"
                          size="icon"
                          className="h-9 w-9 text-muted-foreground hover:text-foreground"
                        >
                          <a
                            href={profile.linkedin_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="LinkedIn profile"
                          >
                            <Linkedin className="h-4 w-4" />
                          </a>
                        </Button>
                      )}
                      {whatsappUrl && (
                        <Button
                          asChild
                          variant="ghost"
                          size="icon"
                          className="h-9 w-9 text-muted-foreground hover:text-green-500"
                        >
                          <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Contact via WhatsApp"
                          >
                            <MessageCircle className="h-4 w-4" />
                          </a>
                        </Button>
                      )}
                      {profile?.email && (
                        <Button
                          asChild
                          variant="ghost"
                          size="icon"
                          className="h-9 w-9 text-muted-foreground hover:text-primary"
                        >
                          <a
                            href={`mailto:${profile.email}`}
                            aria-label="Send Email"
                          >
                            <Mail className="h-4 w-4" />
                          </a>
                        </Button>
                      )}
                    </div>

                    <Button asChild size="sm" variant="outline" className="text-xs gap-1.5">
                      <Link href="/contact">
                        {t.about.contactMe}
                        <ArrowRight className={`h-3 w-3 ${isRtl ? 'rotate-180' : ''}`} />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Bio & Highlights */}
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-4">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
                  {t.about.greeting} <span className="gradient-text">{displayName}</span>
                </h1>
                <p className="text-lg sm:text-xl text-primary font-medium">
                  {professionalTitle}
                </p>
              </div>

              {/* Bio Paragraphs */}
              <div className="space-y-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
                {bio.split('\n\n').map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>

              {/* Key Pillars / Strengths */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                <div className="p-4 rounded-xl border border-border/60 bg-card/60 backdrop-blur-sm space-y-2 hover:border-primary/40 transition-colors">
                  <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    <Code2 className="h-5 w-5" />
                  </div>
                  <h3 className="font-semibold text-sm">{t.about.modernStackTitle}</h3>
                  <p className="text-xs text-muted-foreground leading-normal">
                    {t.about.modernStackDesc}
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-border/60 bg-card/60 backdrop-blur-sm space-y-2 hover:border-primary/40 transition-colors">
                  <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    <Zap className="h-5 w-5" />
                  </div>
                  <h3 className="font-semibold text-sm">{t.about.performanceTitle}</h3>
                  <p className="text-xs text-muted-foreground leading-normal">
                    {t.about.performanceDesc}
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-border/60 bg-card/60 backdrop-blur-sm space-y-2 hover:border-primary/40 transition-colors">
                  <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    <Layers className="h-5 w-5" />
                  </div>
                  <h3 className="font-semibold text-sm">{t.about.cleanArchTitle}</h3>
                  <p className="text-xs text-muted-foreground leading-normal">
                    {t.about.cleanArchDesc}
                  </p>
                </div>
              </div>

              {/* What I Bring to the Table */}
              <div className="p-5 rounded-2xl border border-border/80 bg-muted/20 space-y-3">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
                  {t.about.coreHighlights}
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" />
                    <span>{t.about.highlight1}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" />
                    <span>{t.about.highlight2}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" />
                    <span>{t.about.highlight3}</span>
                  </li>
                </ul>
              </div>

              {/* Call to actions */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Button asChild size="lg" className="gap-2">
                  <Link href="/projects">
                    {t.about.viewProjects}
                    <ArrowRight className={`h-4 w-4 ${isRtl ? 'rotate-180' : ''}`} />
                  </Link>
                </Button>
                {profile?.resume_url && (
                  <Button asChild variant="outline" size="lg" className="gap-2">
                    <a
                      href={profile.resume_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Download className="h-4 w-4" />
                      {t.about.downloadResume}
                    </a>
                  </Button>
                )}
                {whatsappUrl && (
                  <Button asChild variant="secondary" size="lg" className="gap-2">
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessageCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                      {t.hero.chatWhatsApp}
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <SkillsSection skills={skills} />
    </>
  );
}
