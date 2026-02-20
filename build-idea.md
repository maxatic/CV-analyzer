# CV Rater – Build Idea

## Overview

A clean, no-friction web app where anyone can upload their CV and instantly receive an AI-powered score from 1 to 10, along with a detailed breakdown explaining the rating. Think of it as a brutally honest career coach that never sleeps.

---

## Core Features

- **CV Upload** – Accept PDF and DOCX files (max ~5MB)
- **AI Scoring** – Rate the CV from 1–10 using Claude (via Anthropic API)
- **Detailed Feedback** – Break down the score across multiple dimensions (see below)
- **Results Page** – Clean, readable output the user can share or screenshot
- **History (optional)** – Store past submissions so users can track improvement

---

## Scoring Dimensions

The AI should evaluate and comment on each of these, then produce a weighted overall score:

| Dimension | Weight | What it checks |
|---|---|---|
| Clarity & Formatting | 20% | Layout, readability, consistent structure |
| Work Experience | 25% | Relevance, impact statements, progression |
| Skills Section | 15% | Specificity, relevance to modern job market |
| Education | 10% | Presented well, relevant details included |
| Summary / Objective | 10% | Is there one? Is it strong and tailored? |
| Quantified Achievements | 15% | Numbers, metrics, outcomes |
| ATS Friendliness | 5% | Keywords, standard section names, parseable format |

---

## Recommended Tech Stack

### Frontend
- **Next.js (App Router)** – Fast, SEO-friendly, easy to deploy on Vercel
- **Tailwind CSS** – Quick styling without fighting a design system
- **shadcn/ui** – Pre-built accessible components (upload zone, cards, badges)

### Backend / API
- **Next.js API Routes** – Handle file uploads and AI calls server-side
- **Anthropic Claude API** – The core intelligence for parsing and scoring CVs
- **pdf-parse / mammoth** – Extract raw text from PDF and DOCX on the server

### Storage & Database
- **Supabase** – Good default choice:
  - **Supabase Storage** – Store uploaded CV files
  - **Supabase DB (Postgres)** – Persist scores and feedback if you want history
  - **Supabase Auth (optional)** – Allow users to log in and track their CVs over time

### Deployment
- **Vercel** – Zero-config deployment for Next.js, free tier is plenty to start

---

## Simplified Architecture

```
User uploads CV (PDF/DOCX)
        ↓
Next.js API Route receives file
        ↓
File stored in Supabase Storage
        ↓
Text extracted from file (pdf-parse / mammoth)
        ↓
Text + scoring prompt sent to Claude API
        ↓
Claude returns structured JSON score + feedback
        ↓
Result saved to Supabase DB (optional)
        ↓
Results page rendered for user
```

---

## Claude Prompt Strategy

Send Claude a structured system prompt like:

```
You are an expert CV reviewer. Analyze the following CV text and return a JSON object with:
- overall_score (1-10)
- scores: { clarity, experience, skills, education, summary, achievements, ats } each 1-10
- feedback: { [dimension]: "explanation string" }
- top_strengths: ["...", "...", "..."]
- top_improvements: ["...", "...", "..."]
- one_line_verdict: "short punchy summary"
```

This gives you structured data to render a nice results UI.

---

## Pages / Routes

| Route | Purpose |
|---|---|
| `/` | Landing page with upload CTA |
| `/upload` | Drag-and-drop file upload page |
| `/results/[id]` | Score results page (shareable link) |
| `/history` (optional) | User's past CV submissions |

---

## MVP Scope (What to build first)

1. Upload page that accepts PDF/DOCX
2. API route that extracts text and calls Claude
3. Results page that displays overall score + per-dimension breakdown
4. No auth, no history — just upload → get score → done

Everything else (auth, history, share links) is a v2 concern.

---

## Environment Variables Needed

```env
ANTHROPIC_API_KEY=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

---

## Notes for Claude Code

- Start with the MVP scope only — no auth in v1
- Use `pdf-parse` for PDF extraction and `mammoth` for DOCX
- The Claude API call should happen server-side only (never expose the API key to the client)
- Return structured JSON from Claude using a well-defined prompt — easier to render
- Keep the UI simple: upload zone → loading state → results card
- Supabase storage bucket should be private; generate signed URLs if needed for display