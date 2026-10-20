-- ============================================
-- Seed Data for Development
-- ============================================
-- NOTE: These are SAMPLE projects for development only.
-- Replace or remove them before the portfolio goes live.

-- Insert default profile settings
INSERT INTO public.profile_settings (
  display_name,
  professional_title,
  hero_headline,
  hero_description,
  about_bio,
  whatsapp_message,
  accent_color,
  default_theme
) VALUES (
  'Ahmed Zaki',
  'Frontend Engineer | React Developer',
  'Building Modern, Responsive, and User-Focused Web Experiences.',
  'A passionate Frontend Engineer specializing in React and modern web technologies. I build responsive, accessible, and performant web applications with clean code and thoughtful user experiences.',
  'I am a Frontend Engineer focused on building modern web applications using React, TypeScript, and the latest web technologies. My journey in web development is driven by a passion for creating intuitive, accessible, and performant user interfaces.

I specialize in React ecosystem tools including Next.js, Tailwind CSS, and component libraries like shadcn/ui. I follow best practices for code quality, version control with Git and GitFlow, and continuously expand my technical skills.',
  'Hello! I found your portfolio and would like to connect.',
  'blue',
  'system'
) ON CONFLICT DO NOTHING;

-- Insert sample skills
INSERT INTO public.skills (name, category, display_order, is_visible) VALUES
  ('HTML', 'Frontend Fundamentals', 1, true),
  ('CSS', 'Frontend Fundamentals', 2, true),
  ('JavaScript', 'Frontend Fundamentals', 3, true),
  ('TypeScript', 'Frontend Fundamentals', 4, true),
  ('React', 'Frameworks & Libraries', 1, true),
  ('Next.js', 'Frameworks & Libraries', 2, true),
  ('Tailwind CSS', 'Styling & UI', 1, true),
  ('Material UI', 'Styling & UI', 2, true),
  ('shadcn/ui', 'Styling & UI', 3, true),
  ('Git', 'Tools & Workflow', 1, true),
  ('GitFlow', 'Tools & Workflow', 2, true)
ON CONFLICT DO NOTHING;

-- Insert sample projects (for development only)
INSERT INTO public.projects (
  title, slug, short_description, description, category, technologies,
  status, is_featured, display_order, features
) VALUES
(
  'E-Commerce Dashboard',
  'e-commerce-dashboard',
  'A responsive admin dashboard for managing an online store with real-time analytics and inventory management.',
  'This sample project demonstrates a modern admin dashboard built with React and Next.js. It features responsive design, data visualization, and a clean user interface for managing products, orders, and customer data.

Note: This is a sample project for development purposes.',
  'Dashboard',
  ARRAY['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'shadcn/ui'],
  'published',
  true,
  1,
  ARRAY['Responsive dashboard layout', 'Product management interface', 'Order tracking system', 'Data visualization charts']
),
(
  'Weather Application',
  'weather-application',
  'A clean weather app with location search, 5-day forecasts, and interactive weather maps.',
  'This sample project showcases a weather application with a modern UI built using React. It demonstrates API integration, state management, and responsive design patterns.

Note: This is a sample project for development purposes.',
  'Web Application',
  ARRAY['React', 'TypeScript', 'Tailwind CSS', 'REST API'],
  'published',
  true,
  2,
  ARRAY['Location-based weather search', '5-day forecast display', 'Interactive weather maps', 'Responsive mobile layout']
),
(
  'Task Management Tool',
  'task-management-tool',
  'A collaborative task management application with drag-and-drop boards and team features.',
  'This sample project demonstrates a Kanban-style task management application. It features drag-and-drop functionality, real-time updates, and team collaboration capabilities.

Note: This is a sample project for development purposes.',
  'Web Application',
  ARRAY['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Supabase'],
  'published',
  false,
  3,
  ARRAY['Drag-and-drop task boards', 'Team collaboration', 'Real-time updates', 'Task filtering and search']
),
(
  'Portfolio Template',
  'portfolio-template',
  'A customizable developer portfolio template with dark mode and CMS integration.',
  'This sample project is a portfolio template built with Next.js and Tailwind CSS. It features theme switching, dynamic content loading, and SEO optimization.

Note: This is a sample project for development purposes.',
  'Portfolio',
  ARRAY['Next.js', 'TypeScript', 'Tailwind CSS', 'shadcn/ui'],
  'draft',
  false,
  4,
  ARRAY['Dark/Light theme switching', 'Dynamic content management', 'SEO optimized', 'Responsive design']
)
ON CONFLICT DO NOTHING;
