// This file will be auto-generated from the Supabase schema.
// For now, we define the types manually to match our migration.
// Run `npx supabase gen types typescript --local > src/types/database.types.ts`
// to regenerate after applying migrations.

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      projects: {
        Row: {
          id: string;
          title: string;
          slug: string;
          short_description: string;
          description: string | null;
          thumbnail_path: string | null;
          gallery_paths: string[];
          technologies: string[];
          category: string;
          live_url: string | null;
          github_url: string | null;
          status: 'draft' | 'published';
          is_featured: boolean;
          display_order: number;
          features: string[];
          challenges: string | null;
          solutions: string | null;
          created_at: string;
          updated_at: string;
          published_at: string | null;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          short_description: string;
          description?: string | null;
          thumbnail_path?: string | null;
          gallery_paths?: string[];
          technologies?: string[];
          category: string;
          live_url?: string | null;
          github_url?: string | null;
          status?: 'draft' | 'published';
          is_featured?: boolean;
          display_order?: number;
          features?: string[];
          challenges?: string | null;
          solutions?: string | null;
          created_at?: string;
          updated_at?: string;
          published_at?: string | null;
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string;
          short_description?: string;
          description?: string | null;
          thumbnail_path?: string | null;
          gallery_paths?: string[];
          technologies?: string[];
          category?: string;
          live_url?: string | null;
          github_url?: string | null;
          status?: 'draft' | 'published';
          is_featured?: boolean;
          display_order?: number;
          features?: string[];
          challenges?: string | null;
          solutions?: string | null;
          created_at?: string;
          updated_at?: string;
          published_at?: string | null;
        };
      };
      profile_settings: {
        Row: {
          id: string;
          display_name: string;
          professional_title: string;
          hero_headline: string;
          hero_description: string;
          about_bio: string | null;
          profile_image_path: string | null;
          resume_url: string | null;
          email: string | null;
          github_url: string | null;
          linkedin_url: string | null;
          whatsapp_number: string | null;
          whatsapp_message: string | null;
          website_title: string | null;
          seo_description: string | null;
          og_image_path: string | null;
          accent_color: string;
          default_theme: 'light' | 'dark' | 'system';
          footer_text: string | null;
          contact_section_content: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          display_name: string;
          professional_title: string;
          hero_headline: string;
          hero_description: string;
          about_bio?: string | null;
          profile_image_path?: string | null;
          resume_url?: string | null;
          email?: string | null;
          github_url?: string | null;
          linkedin_url?: string | null;
          whatsapp_number?: string | null;
          whatsapp_message?: string | null;
          website_title?: string | null;
          seo_description?: string | null;
          og_image_path?: string | null;
          accent_color?: string;
          default_theme?: 'light' | 'dark' | 'system';
          footer_text?: string | null;
          contact_section_content?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          display_name?: string;
          professional_title?: string;
          hero_headline?: string;
          hero_description?: string;
          about_bio?: string | null;
          profile_image_path?: string | null;
          resume_url?: string | null;
          email?: string | null;
          github_url?: string | null;
          linkedin_url?: string | null;
          whatsapp_number?: string | null;
          whatsapp_message?: string | null;
          website_title?: string | null;
          seo_description?: string | null;
          og_image_path?: string | null;
          accent_color?: string;
          default_theme?: 'light' | 'dark' | 'system';
          footer_text?: string | null;
          contact_section_content?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      skills: {
        Row: {
          id: string;
          name: string;
          category: string;
          proficiency_label: string | null;
          is_visible: boolean;
          display_order: number;
          icon_name: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          category: string;
          proficiency_label?: string | null;
          is_visible?: boolean;
          display_order?: number;
          icon_name?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          category?: string;
          proficiency_label?: string | null;
          is_visible?: boolean;
          display_order?: number;
          icon_name?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
}
