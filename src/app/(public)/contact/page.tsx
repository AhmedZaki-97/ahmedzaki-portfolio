import type { Metadata } from 'next';
import { ContactSection } from '@/components/portfolio/contact-section';
import { getProfileSettings } from '@/features/profile/services';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Ahmed Zaki. Available via WhatsApp, email, and social media.',
};

export default async function ContactPage() {
  const profile = await getProfileSettings();

  return (
    <div className="py-10">
      <div className="container-narrow mb-10">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
          Contact
        </h1>
      </div>
      <ContactSection profile={profile} />
    </div>
  );
}
