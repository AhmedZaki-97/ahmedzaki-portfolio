# Ahmed Zaki — Professional Portfolio & Admin Dashboard

A modern, production-grade personal portfolio and content management system for **Ahmed Zaki**, Frontend Engineer & React Developer. Built with Next.js 16 (App Router), TypeScript, Tailwind CSS v4, shadcn/ui, and Supabase.

---

## 🌟 Features

### 🌐 Public Portfolio
- **Editorial Hero Section**: Clean presentation of Ahmed Zaki's professional title, headline, and bio with instant WhatsApp & email call-to-actions.
- **Featured Projects Showcase**: Curated selection of high-impact development projects with live demo and source code links.
- **Dynamic Projects Directory**: Filterable by category, searchable by title and description, with dynamic detail pages (`/projects/[slug]`).
- **About & Skills Presentation**: Categorized skills (Frontend Fundamentals, Frameworks & Libraries, Styling & UI, Tools & Workflow) and developer philosophy without fabricated claims.
- **Direct Contact & WhatsApp Integration**: Integrated WhatsApp CTA using proper international phone formatting (`https://wa.me/...`), direct email links, and social profiles (GitHub, LinkedIn).
- **Zero-Flicker Dark & Light Mode**: Theme toggling persisted across sessions, respecting system preferences without SSR hydration flicker.

### 🛡️ Protected Admin Dashboard (`/admin`)
- **Secure Authentication**: Supabase Auth with server-enforced `ADMIN_EMAIL_ALLOWLIST` authorization.
- **Project CRUD & Management**:
  - Create, edit, and safely delete projects.
  - Publish / unpublish draft states.
  - Feature / unfeature projects on the homepage.
  - Drag-and-drop thumbnail & screenshot uploads via Supabase Storage.
  - Dynamic slug generation and conflict resolution.
- **Skills Management**: Add, update, reorder, and toggle visibility for technical skills grouped by category.
- **Site & Profile Settings**:
  - Manage contact info, WhatsApp number & default greeting message.
  - Update hero headline, bio, footer text, and SEO metadata.
  - Customize default theme preferences.

---

## 🏗️ Architecture & Technology Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 16 (App Router, Turbopack, Partial Prerendering) |
| **Language** | TypeScript (Strict Mode) |
| **Styling** | Tailwind CSS v4, CSS Variables token system |
| **UI Components** | shadcn/ui primitives, Lucide React icons, Sonner toast notifications |
| **Database & Auth** | Supabase PostgreSQL with Row-Level Security (RLS) & Supabase Auth |
| **Object Storage** | Supabase Storage (`portfolio-assets` bucket) |
| **Form Management** | React Hook Form + Zod validation |
| **Testing** | Vitest unit test suite |

---

## 🚀 Getting Started (Windows 11 / PowerShell)

### Prerequisites
- **Node.js**: v20.x or higher (LTS recommended)
- **npm**: v10.x or higher
- **Supabase Account**: A free Supabase project at [supabase.com](https://supabase.com)

### 1. Clone & Install Dependencies
Open **PowerShell** in the project directory:

```powershell
npm install
```

### 2. Configure Environment Variables
Copy the template environment file:

```powershell
Copy-Item .env.example .env.local
```

Open `.env.local` in your editor and configure your credentials:

```env
# Supabase Configuration (from Supabase Project Settings > API)
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_publishable_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_secret_key

# Admin Email Allowlist (comma-separated list of authorized admin emails)
ADMIN_EMAIL_ALLOWLIST=ahmed@example.com

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

> ⚠️ **Security Notice**: `SUPABASE_SERVICE_ROLE_KEY` is only used on the server for privileged administrative operations. Never expose it with a `NEXT_PUBLIC_` prefix.

---

## 🗄️ Supabase Database & Storage Setup

### 1. Database Schema Migration
1. Go to your Supabase project dashboard at [supabase.com](https://supabase.com).
2. Open the **SQL Editor** from the left sidebar.
3. Open `supabase/migrations/00001_initial_schema.sql` from this repository, paste the contents into the SQL Editor, and click **Run**.
4. This creates:
   - `projects` table with indexes, status constraints, and RLS policies.
   - `profile_settings` singleton table with initial defaults.
   - `skills` table with ordering and category indexing.
   - Automated `updated_at` triggers.

### 2. Seed Initial Development Data (Optional)
In the Supabase SQL Editor, open `supabase/seed.sql`, paste the contents, and click **Run** to load initial skills and sample projects.

### 3. Create Storage Bucket
In the Supabase dashboard:
1. Navigate to **Storage** > **New Bucket**.
2. Name the bucket `portfolio-assets`.
3. Set **Public Bucket** to **Enabled**.
4. Run the storage RLS policies in the SQL Editor (included at the bottom of `supabase/migrations/00001_initial_schema.sql`):
   ```sql
   INSERT INTO storage.buckets (id, name, public)
   VALUES ('portfolio-assets', 'portfolio-assets', true)
   ON CONFLICT (id) DO NOTHING;

   CREATE POLICY "Public read access for portfolio assets"
     ON storage.objects FOR SELECT
     USING (bucket_id = 'portfolio-assets');

   CREATE POLICY "Authenticated users can upload portfolio assets"
     ON storage.objects FOR INSERT
     TO authenticated
     WITH CHECK (bucket_id = 'portfolio-assets');

   CREATE POLICY "Authenticated users can update portfolio assets"
     ON storage.objects FOR UPDATE
     TO authenticated
     USING (bucket_id = 'portfolio-assets');

   CREATE POLICY "Authenticated users can delete portfolio assets"
     ON storage.objects FOR DELETE
     TO authenticated
     USING (bucket_id = 'portfolio-assets');
   ```

### 4. Create Admin User
1. In the Supabase dashboard, go to **Authentication** > **Users**.
2. Click **Add User** > **Create User**.
3. Enter the email address matching your `ADMIN_EMAIL_ALLOWLIST` in `.env.local` and a secure password.
4. Confirm email directly (or enable "Auto-confirm user").
5. You can now log into `/admin/login`.

---

## 💻 Development Commands

| Command | Description |
|---|---|
| `npm run dev` | Starts the Next.js development server at `http://localhost:3000` |
| `npm run build` | Produces an optimized production build |
| `npm run start` | Runs the production build locally |
| `npm run lint` | Runs ESLint checks across the codebase |
| `npm test` | Runs the Vitest unit test suite |
| `npx tsc --noEmit` | Runs strict TypeScript type-checking |

---

## 🧪 Unit Tests

The test suite covers critical utility functions, URL formatting, and Zod validation schemas:

```powershell
npm test
```

- `tests/utils/slug.test.ts`: Slug creation, special character handling, and slug validation.
- `tests/utils/whatsapp.test.ts`: International phone formatting, Egyptian mobile number normalization, and URL builder.
- `tests/schemas/project-schema.test.ts`: Form validation, required fields, and URL constraints.
- `tests/schemas/profile-skill.test.ts`: Profile settings and skill model validation.

---

## 🔒 Security Best Practices

1. **Defense-in-Depth Authorization**:
   - Client-side navigation guards in Next.js middleware / proxy.
   - Layout-level session and email allowlist verification in `src/app/admin/(authenticated)/layout.tsx`.
   - Server-level verification at the start of every Server Action and Route Handler via `requireAdmin()`.
2. **PostgreSQL Row-Level Security**:
   - Anonymous visitors can only read `published` projects and `visible` skills.
   - All write mutations require authenticated Supabase sessions.
3. **Input Sanitization**:
   - All server mutations parse payloads through strict Zod schemas before touching the database.
