import type { Metadata } from 'next';
import { getProjectStats, getAllProjects } from '@/features/projects/services';
import { getProfileSettings } from '@/features/profile/services';
import { DashboardContent } from '@/components/admin/dashboard-content';

export const metadata: Metadata = {
  title: 'Dashboard',
  robots: { index: false, follow: false },
};

export default async function DashboardPage() {
  const [stats, projects, profile] = await Promise.all([
    getProjectStats(),
    getAllProjects(),
    getProfileSettings(),
  ]);

  const recentProjects = projects
    .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
    .slice(0, 5);

  const showWhatsAppReminder = !profile?.whatsapp_number;

  return (
    <DashboardContent
      stats={stats}
      recentProjects={recentProjects}
      showWhatsAppReminder={showWhatsAppReminder}
    />
  );
}
