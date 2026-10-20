-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- Projects Table
-- ============================================
CREATE TABLE public.projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  short_description TEXT NOT NULL,
  description TEXT,
  thumbnail_path TEXT,
  gallery_paths TEXT[] DEFAULT '{}',
  technologies TEXT[] DEFAULT '{}',
  category TEXT NOT NULL DEFAULT 'Other',
  live_url TEXT,
  github_url TEXT,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  is_featured BOOLEAN NOT NULL DEFAULT false,
  display_order INTEGER NOT NULL DEFAULT 0,
  features TEXT[] DEFAULT '{}',
  challenges TEXT,
  solutions TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  published_at TIMESTAMPTZ
);

-- Indexes for projects
CREATE INDEX idx_projects_slug ON public.projects(slug);
CREATE INDEX idx_projects_status ON public.projects(status);
CREATE INDEX idx_projects_is_featured ON public.projects(is_featured);
CREATE INDEX idx_projects_display_order ON public.projects(display_order);
CREATE INDEX idx_projects_category ON public.projects(category);

-- ============================================
-- Profile Settings Table (singleton pattern)
-- ============================================
CREATE TABLE public.profile_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  display_name TEXT NOT NULL DEFAULT 'Ahmed Zaki',
  professional_title TEXT NOT NULL DEFAULT 'Frontend Engineer | React Developer',
  hero_headline TEXT NOT NULL DEFAULT 'Building Modern, Responsive, and User-Focused Web Experiences.',
  hero_description TEXT NOT NULL DEFAULT 'A passionate Frontend Engineer specializing in React and modern web technologies. I build responsive, accessible, and performant web applications.',
  about_bio TEXT,
  profile_image_path TEXT,
  resume_url TEXT,
  email TEXT,
  github_url TEXT,
  linkedin_url TEXT,
  whatsapp_number TEXT,
  whatsapp_message TEXT DEFAULT 'Hello! I found your portfolio and would like to connect.',
  website_title TEXT DEFAULT 'Ahmed Zaki — Frontend Engineer',
  seo_description TEXT DEFAULT 'Portfolio of Ahmed Zaki, a Frontend Engineer specializing in React and modern web development.',
  og_image_path TEXT,
  accent_color TEXT NOT NULL DEFAULT 'blue',
  default_theme TEXT NOT NULL DEFAULT 'system' CHECK (default_theme IN ('light', 'dark', 'system')),
  footer_text TEXT DEFAULT 'Crafted with passion and modern web technologies.',
  contact_section_content TEXT DEFAULT 'I am always interested in connecting with fellow developers and discussing new opportunities. Feel free to reach out!',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  -- Singleton constraint: only one profile row allowed
  CONSTRAINT single_profile CHECK (id IS NOT NULL)
);

-- ============================================
-- Skills Table
-- ============================================
CREATE TABLE public.skills (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'Other',
  proficiency_label TEXT,
  is_visible BOOLEAN NOT NULL DEFAULT true,
  display_order INTEGER NOT NULL DEFAULT 0,
  icon_name TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_skills_category ON public.skills(category);
CREATE INDEX idx_skills_is_visible ON public.skills(is_visible);
CREATE INDEX idx_skills_display_order ON public.skills(display_order);

-- ============================================
-- Updated-at trigger function
-- ============================================
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at triggers
CREATE TRIGGER set_projects_updated_at
  BEFORE UPDATE ON public.projects
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_profile_settings_updated_at
  BEFORE UPDATE ON public.profile_settings
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_skills_updated_at
  BEFORE UPDATE ON public.skills
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ============================================
-- Row Level Security
-- ============================================

-- Enable RLS on all tables
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profile_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;

-- Projects policies
CREATE POLICY "Public can view published projects"
  ON public.projects FOR SELECT
  USING (status = 'published');

CREATE POLICY "Authenticated users can view all projects"
  ON public.projects FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert projects"
  ON public.projects FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update projects"
  ON public.projects FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete projects"
  ON public.projects FOR DELETE
  TO authenticated
  USING (true);

-- Profile settings policies
CREATE POLICY "Public can view profile settings"
  ON public.profile_settings FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can update profile settings"
  ON public.profile_settings FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can insert profile settings"
  ON public.profile_settings FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Skills policies
CREATE POLICY "Public can view visible skills"
  ON public.skills FOR SELECT
  USING (is_visible = true);

CREATE POLICY "Authenticated users can view all skills"
  ON public.skills FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert skills"
  ON public.skills FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update skills"
  ON public.skills FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete skills"
  ON public.skills FOR DELETE
  TO authenticated
  USING (true);

-- ============================================
-- Storage bucket
-- ============================================
-- Note: Run these in the Supabase dashboard SQL editor or via the Supabase CLI:
--
-- INSERT INTO storage.buckets (id, name, public)
-- VALUES ('portfolio-assets', 'portfolio-assets', true);
--
-- CREATE POLICY "Public read access for portfolio assets"
--   ON storage.objects FOR SELECT
--   USING (bucket_id = 'portfolio-assets');
--
-- CREATE POLICY "Authenticated users can upload portfolio assets"
--   ON storage.objects FOR INSERT
--   TO authenticated
--   WITH CHECK (bucket_id = 'portfolio-assets');
--
-- CREATE POLICY "Authenticated users can update portfolio assets"
--   ON storage.objects FOR UPDATE
--   TO authenticated
--   USING (bucket_id = 'portfolio-assets');
--
-- CREATE POLICY "Authenticated users can delete portfolio assets"
--   ON storage.objects FOR DELETE
--   TO authenticated
--   USING (bucket_id = 'portfolio-assets');
