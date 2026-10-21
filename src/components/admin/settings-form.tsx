'use client';

import { useTransition } from 'react';
import { useForm, type Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Loader2, Save, User, Share2, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import {
  profileSettingsSchema,
  type ProfileSettingsFormValues,
} from '@/features/profile/schemas';
import { updateProfileSettings } from '@/features/profile/actions';
import { useI18n } from '@/lib/i18n/context';
import type { ProfileSettings } from '@/types';

interface SettingsFormProps {
  profile: ProfileSettings | null;
}

export function SettingsForm({ profile }: SettingsFormProps) {
  const [isPending, startTransition] = useTransition();
  const { t, locale } = useI18n();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<ProfileSettingsFormValues>({
    resolver: zodResolver(profileSettingsSchema) as Resolver<ProfileSettingsFormValues>,
    defaultValues: {
      display_name: profile?.display_name || 'Ahmed Zaki',
      professional_title: profile?.professional_title || 'Frontend Engineer | React Developer',
      hero_headline: profile?.hero_headline || 'Building Modern, Responsive, and User-Focused Web Experiences.',
      hero_description: profile?.hero_description || '',
      about_bio: profile?.about_bio || '',
      email: profile?.email || '',
      github_url: profile?.github_url || '',
      linkedin_url: profile?.linkedin_url || '',
      whatsapp_number: profile?.whatsapp_number || '',
      whatsapp_message: profile?.whatsapp_message || '',
      website_title: profile?.website_title || '',
      seo_description: profile?.seo_description || '',
      accent_color: profile?.accent_color || 'blue',
      default_theme: (profile?.default_theme as 'light' | 'dark' | 'system') || 'system',
      footer_text: profile?.footer_text || '',
      contact_section_content: profile?.contact_section_content || '',
      resume_url: profile?.resume_url || '',
    },
  });

  function onSubmit(data: ProfileSettingsFormValues) {
    startTransition(async () => {
      const result = await updateProfileSettings(data);
      if (result.success) {
        toast.success(t.admin.settingsSaved);
      } else {
        toast.error(result.error || 'Failed to save settings');
      }
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="profile" className="gap-2">
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">
              {locale === 'ar' ? 'الملف الشخصي' : 'Profile'}
            </span>
          </TabsTrigger>
          <TabsTrigger value="social" className="gap-2">
            <Share2 className="h-4 w-4" />
            <span className="hidden sm:inline">
              {locale === 'ar' ? 'التواصل الاجتماعي' : 'Social'}
            </span>
          </TabsTrigger>
          <TabsTrigger value="website" className="gap-2">
            <Globe className="h-4 w-4" />
            <span className="hidden sm:inline">
              {locale === 'ar' ? 'الموقع و SEO' : 'Website'}
            </span>
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Update your personal information and bio
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="display_name">
                    Display Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="display_name"
                    {...register('display_name')}
                    disabled={isPending}
                  />
                  {errors.display_name && (
                    <p className="text-xs text-destructive">{errors.display_name.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="professional_title">
                    Professional Title <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="professional_title"
                    {...register('professional_title')}
                    disabled={isPending}
                  />
                  {errors.professional_title && (
                    <p className="text-xs text-destructive">{errors.professional_title.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="hero_headline">
                  Hero Headline <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="hero_headline"
                  {...register('hero_headline')}
                  disabled={isPending}
                />
                {errors.hero_headline && (
                  <p className="text-xs text-destructive">{errors.hero_headline.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="hero_description">
                  Hero Description <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="hero_description"
                  {...register('hero_description')}
                  rows={3}
                  disabled={isPending}
                />
                {errors.hero_description && (
                  <p className="text-xs text-destructive">{errors.hero_description.message}</p>
                )}
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="about_bio">About / Bio</Label>
                <Textarea
                  id="about_bio"
                  {...register('about_bio')}
                  rows={6}
                  placeholder="Write a brief bio about yourself..."
                  disabled={isPending}
                />
                {errors.about_bio && (
                  <p className="text-xs text-destructive">{errors.about_bio.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="resume_url">Resume URL</Label>
                <Input
                  id="resume_url"
                  type="url"
                  {...register('resume_url')}
                  placeholder="https://..."
                  disabled={isPending}
                />
                {errors.resume_url && (
                  <p className="text-xs text-destructive">{errors.resume_url.message}</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Social Tab */}
        <TabsContent value="social" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Contact & Social Links</CardTitle>
              <CardDescription>
                Manage your contact information and social media links
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  {...register('email')}
                  placeholder="you@example.com"
                  disabled={isPending}
                />
                {errors.email && (
                  <p className="text-xs text-destructive">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="github_url">GitHub URL</Label>
                <Input
                  id="github_url"
                  type="url"
                  {...register('github_url')}
                  placeholder="https://github.com/username"
                  disabled={isPending}
                />
                {errors.github_url && (
                  <p className="text-xs text-destructive">{errors.github_url.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="linkedin_url">LinkedIn URL</Label>
                <Input
                  id="linkedin_url"
                  type="url"
                  {...register('linkedin_url')}
                  placeholder="https://linkedin.com/in/username"
                  disabled={isPending}
                />
                {errors.linkedin_url && (
                  <p className="text-xs text-destructive">{errors.linkedin_url.message}</p>
                )}
              </div>

              <Separator />

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="whatsapp_number">WhatsApp Number</Label>
                  <Input
                    id="whatsapp_number"
                    {...register('whatsapp_number')}
                    placeholder="+20 1XX XXX XXXX"
                    disabled={isPending}
                  />
                  <p className="text-xs text-muted-foreground">
                    Include country code (e.g., +201234567890)
                  </p>
                  {errors.whatsapp_number && (
                    <p className="text-xs text-destructive">{errors.whatsapp_number.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="whatsapp_message">Default WhatsApp Message</Label>
                  <Input
                    id="whatsapp_message"
                    {...register('whatsapp_message')}
                    placeholder="Hello! I'd like to connect..."
                    disabled={isPending}
                  />
                  {errors.whatsapp_message && (
                    <p className="text-xs text-destructive">{errors.whatsapp_message.message}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Website Tab */}
        <TabsContent value="website" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Website & SEO</CardTitle>
              <CardDescription>
                Configure your website metadata and appearance
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="website_title">Website Title</Label>
                <Input
                  id="website_title"
                  {...register('website_title')}
                  placeholder="Ahmed Zaki — Frontend Engineer"
                  disabled={isPending}
                />
                {errors.website_title && (
                  <p className="text-xs text-destructive">{errors.website_title.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="seo_description">SEO Description</Label>
                <Textarea
                  id="seo_description"
                  {...register('seo_description')}
                  rows={3}
                  placeholder="A brief description for search engines..."
                  disabled={isPending}
                />
                {errors.seo_description && (
                  <p className="text-xs text-destructive">{errors.seo_description.message}</p>
                )}
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="footer_text">Footer Text</Label>
                <Input
                  id="footer_text"
                  {...register('footer_text')}
                  placeholder="Crafted with passion..."
                  disabled={isPending}
                />
                {errors.footer_text && (
                  <p className="text-xs text-destructive">{errors.footer_text.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact_section_content">Contact Section Content</Label>
                <Textarea
                  id="contact_section_content"
                  {...register('contact_section_content')}
                  rows={3}
                  placeholder="Text shown on the contact page..."
                  disabled={isPending}
                />
                {errors.contact_section_content && (
                  <p className="text-xs text-destructive">{errors.contact_section_content.message}</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Save Button */}
      <div className="flex justify-end pt-6">
        <Button type="submit" disabled={isPending || !isDirty} className="gap-2">
          {isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Save className="h-4 w-4" />
          )}
          {isPending ? t.admin.saving : t.admin.saveSettings}
        </Button>
      </div>
    </form>
  );
}
