export const siteConfig = {
  name: 'Ahmed Zaki',
  title: 'Ahmed Zaki — Frontend Engineer',
  description: 'Building Modern, Responsive, and User-Focused Web Experiences.',
  role: 'Frontend Engineer | React Developer',
  headline: 'Building Modern, Responsive, and User-Focused Web Experiences.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
} as const;

export const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Projects', href: '/projects' },
  { label: 'Contact', href: '/contact' },
] as const;

export const projectCategories = [
  'Web Application',
  'Landing Page',
  'E-Commerce',
  'Dashboard',
  'Portfolio',
  'Mobile App',
  'API / Backend',
  'Other',
] as const;

export const technologyOptions = [
  'HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'Next.js',
  'Tailwind CSS', 'Material UI', 'shadcn/ui', 'Node.js', 'Express',
  'MongoDB', 'PostgreSQL', 'Supabase', 'Firebase', 'Git', 'Docker',
  'Redux', 'Zustand', 'React Query', 'Prisma', 'GraphQL', 'REST API',
  'Framer Motion', 'Three.js', 'Sass', 'Bootstrap', 'Vite', 'Webpack',
] as const;
