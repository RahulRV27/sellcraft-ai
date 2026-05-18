# SellCraft AI - Project Instructions

Read `docs/CLAUDE-GUIDE.md` for full strategy context, principles, and file index.

## Tech Stack

- **Frontend:** Next.js 15+ (App Router), Tailwind CSS v4, shadcn/ui
- **Backend:** Next.js API Routes
- **Database:** Supabase (PostgreSQL + pgvector + Auth)
- **AI:** Claude API (Sonnet for generation, Haiku for scoring), prompt templates in `prompts/`
- **Payments:** Razorpay
- **State:** Zustand
- **Forms:** React Hook Form + Zod

## Commands

- `npm run dev` - Start dev server
- `npm run build` - Production build
- `npm run lint` - Run ESLint

## Code Conventions

- Use Server Components by default; add `"use client"` only when needed
- All database access through `src/lib/supabase/` (client.ts for browser, server.ts for server)
- Never expose `SUPABASE_SERVICE_ROLE_KEY` or `ANTHROPIC_API_KEY` to client code
- Mobile-first responsive design (44px min touch targets)
- All AI prompts must be India-commerce-specific, never generic
- Constants (platforms, categories, plan limits) are in `src/lib/constants.ts`

## Key Directories

- `docs/strategy/` - Strategy docs (read-only reference)
- `prompts/` - AI prompt templates (base + platform + category + context)
- `supabase/migrations/` - Database schema
- `src/app/(dashboard)/` - Dashboard pages (auth-gated)
- `src/app/(auth)/` - Auth pages
- `src/components/ui/` - shadcn/ui components (auto-managed, don't edit directly)
- `src/components/layout/` - Layout components (sidebar, header, mobile-nav)
- `src/components/shared/` - Shared components (page-header, platform-selector)
