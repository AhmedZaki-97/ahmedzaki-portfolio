import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { WhatsAppFab } from '@/components/shared/whatsapp-fab';
import { getProfileSettings } from '@/features/profile/services';

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const profile = await getProfileSettings();

  return (
    <>
      <Navbar
        whatsappNumber={profile?.whatsapp_number}
        whatsappMessage={profile?.whatsapp_message}
      />
      <main className="flex-1">{children}</main>
      <Footer profileSettings={profile} />
      {profile?.whatsapp_number && (
        <WhatsAppFab
          phoneNumber={profile.whatsapp_number}
          message={profile.whatsapp_message}
        />
      )}
    </>
  );
}
