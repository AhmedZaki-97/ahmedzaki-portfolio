import type { Metadata } from 'next';
import { getProfileSettings } from '@/features/profile/services';
import { SettingsForm } from '@/components/admin/settings-form';

export const metadata: Metadata = {
  title: 'Settings',
  robots: { index: false, follow: false },
};

export default async function AdminSettingsPage() {
  const profile = await getProfileSettings();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your profile, social links, and website settings</p>
      </div>
      <SettingsForm profile={profile} />
    </div>
  );
}
