import { HeroSection } from '@/components/portfolio/hero-section';
import { FeaturedProjects } from '@/components/portfolio/featured-projects';
import { SkillsSection } from '@/components/portfolio/skills-section';
import { ContactSection } from '@/components/portfolio/contact-section';
import { getProfileSettings } from '@/features/profile/services';
import { getFeaturedProjects } from '@/features/projects/services';
import { getVisibleSkills } from '@/features/skills/services';

export default async function HomePage() {
  const [profile, featuredProjects, skills] = await Promise.all([
    getProfileSettings(),
    getFeaturedProjects(),
    getVisibleSkills(),
  ]);

  return (
    <>
      <HeroSection profile={profile} />
      <FeaturedProjects projects={featuredProjects} />
      <SkillsSection skills={skills} />
      <ContactSection profile={profile} />
    </>
  );
}
