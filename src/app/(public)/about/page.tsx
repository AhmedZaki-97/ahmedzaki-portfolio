import type { Metadata } from 'next';
import { getProfileSettings } from '@/features/profile/services';
import { getVisibleSkills } from '@/features/skills/services';
import { SkillsSection } from '@/components/portfolio/skills-section';

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn more about Ahmed Zaki, a Frontend Engineer specializing in React and modern web development.',
};

export default async function AboutPage() {
  const [profile, skills] = await Promise.all([
    getProfileSettings(),
    getVisibleSkills(),
  ]);

  const bio = profile?.about_bio || `I am a Frontend Engineer focused on building modern web applications using React, TypeScript, and the latest web technologies. My journey in web development is driven by a passion for creating intuitive, accessible, and performant user interfaces.

I specialize in React ecosystem tools including Next.js, Tailwind CSS, and component libraries like shadcn/ui. I follow best practices for code quality, version control with Git and GitFlow, and continuously expand my technical skills.`;

  return (
    <>
      <section className="py-20 md:py-28">
        <div className="container-narrow">
          <div className="space-y-4 mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
              About Me
            </h1>
            <p className="text-lg text-primary font-medium">
              {profile?.professional_title || 'Frontend Engineer | React Developer'}
            </p>
          </div>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            {bio.split('\n\n').map((paragraph, i) => (
              <p key={i} className="text-muted-foreground leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      <SkillsSection skills={skills} />
    </>
  );
}
