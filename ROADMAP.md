# CV Analyzer – Development Roadmap

This file tracks the full development of the project from zero to deployed. Check off tasks as they're completed and use this as the single source of truth for what's done, in progress, or next.

---

## Phase 0 – Project Setup

- [x] Create GitHub repository (`CV-analyzer`)
- [x] Create local project folder (`CV analyzer project`)
- [x] Push initial commit with `build-idea.md`
- [x] Scaffold Next.js app with App Router
  ```bash
  npx create-next-app@latest . --typescript --tailwind --app --eslint
  ```
- [x] Install core dependencies
  ```bash
  npm install @anthropic-ai/sdk pdf-parse mammoth
  npm install @supabase/supabase-js
  npx shadcn@latest init
  ```
- [x] Set up `.env.local` with required keys (never commit this file)
  ```
  ANTHROPIC_API_KEY=
  NEXT_PUBLIC_SUPABASE_URL=
  NEXT_PUBLIC_SUPABASE_ANON_KEY=
  SUPABASE_SERVICE_ROLE_KEY=
  ```
- [x] Add `.env.local` to `.gitignore`
- [ ] Push scaffolded project to GitHub

---

## Phase 1 – Backend / API Layer (MVP Core)

### 1.1 File Upload API Route
- [x] Create `app/api/upload/route.ts`
- [x] Accept `multipart/form-data` with a single file field
- [x] Validate file type (PDF or DOCX only) and size (≤ 5MB)
- [x] Return clear error responses for invalid uploads

### 1.2 Text Extraction
- [x] Use `pdf-parse` to extract text from PDF files
- [x] Use `mammoth` to extract text from DOCX files
- [x] Handle extraction errors gracefully (empty CV, corrupted file, etc.)

### 1.3 Claude API Integration
- [x] Build the scoring prompt (structured system prompt → JSON response)
- [x] Call Claude API server-side using `@anthropic-ai/sdk`
- [x] Parse and validate the returned JSON:
  ```
  {
    overall_score,
    scores: { clarity, experience, skills, education, summary, achievements, ats },
    feedback: { [dimension]: string },
    top_strengths: string[],
    top_improvements: string[],
    one_line_verdict: string
  }
  ```
- [x] Return the structured result from the API route

### 1.4 Supabase Setup
- [x] Create Supabase project
- [x] Create a private storage bucket for CV files (`cvs`)
- [x] Create a `results` table in Postgres to persist scores + feedback
- [x] Upload CV file to Supabase Storage from the API route
- [x] Save result JSON to the `results` table, return a result `id`

---

## Phase 2 – Frontend (MVP UI)

### 2.1 Landing Page `/`
- [ ] Simple hero section explaining what the app does
- [ ] CTA button → navigates to `/upload`

### 2.2 Upload Page `/upload`
- [ ] Drag-and-drop upload zone (shadcn or custom)
- [ ] File type and size validation on the client side
- [ ] Show upload progress / loading state while processing
- [ ] On success → redirect to `/results/[id]`
- [ ] On error → display a clear error message

### 2.3 Results Page `/results/[id]`
- [ ] Fetch result from Supabase by `id`
- [ ] Display overall score (large, prominent)
- [ ] Display per-dimension scores with labels and weights
- [ ] Display `one_line_verdict`
- [ ] Display `top_strengths` and `top_improvements`
- [ ] Display per-dimension feedback text
- [ ] Make the page shareable (the URL is enough)

---

## Phase 3 – Polish & Deployment

- [ ] Add proper loading skeletons / spinners
- [ ] Handle edge cases: API timeout, Claude error, empty text extracted
- [ ] Responsive design check (mobile-friendly)
- [ ] Add a simple `<head>` meta title and description per page
- [ ] Deploy to Vercel (connect GitHub repo, add env vars in dashboard)
- [ ] Smoke test the full flow on production

---

## Phase 4 – V2 Features (Post-MVP)

These are out of scope for v1. Revisit after the MVP is live and working.

- [ ] User auth (Supabase Auth) – let users log in
- [ ] History page `/history` – list past submissions per user
- [ ] Shareable result links with OG image preview
- [ ] Side-by-side CV comparison
- [ ] Tailored feedback by job role or industry

---

## Key References

- `build-idea.md` – Original project spec, architecture diagram, and Claude prompt strategy
- [Anthropic Claude API docs](https://docs.anthropic.com)
- [Supabase docs](https://supabase.com/docs)
- [Next.js App Router docs](https://nextjs.org/docs/app)
- [shadcn/ui docs](https://ui.shadcn.com)
