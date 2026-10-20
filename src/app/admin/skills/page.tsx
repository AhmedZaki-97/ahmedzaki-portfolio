import type { Metadata } from 'next';
import { getAllSkills } from '@/features/skills/services';
import { SkillsManager } from '@/components/admin/skills-manager';

export const metadata: Metadata = {
  title: 'Manage Skills',
  robots: { index: false, follow: false },
};

export default async function AdminSkillsPage() {
  const skills = await getAllSkills();

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Skills</h1>
        <p className="text-muted-foreground">Manage your skills and technologies</p>
      </div>
      <SkillsManager skills={skills} />
    </div>
  );
}
