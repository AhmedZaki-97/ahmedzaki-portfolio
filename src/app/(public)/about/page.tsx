import type { Metadata } from 'next';
import { getProfileSettings } from '@/features/profile/services';
import { getVisibleSkills } from '@/features/skills/services';
import { AboutContent } from '@/components/portfolio/about-content';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Learn more about Ahmed Zaki, a Frontend Engineer specializing in React, Next.js, and modern web development.',
};

export default async function AboutPage() {
  const [profile, skills] = await Promise.all([
    getProfileSettings(),
    getVisibleSkills(),
  ]);

  return <AboutContent profile={profile} skills={skills} />;
}
