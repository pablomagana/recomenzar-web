# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Recomenzar is a Spanish-language website for an organization that helps people reintegrate into society. It features a landing page with contact/registration forms and a training & employment portal. Built as a frontend-only React SPA with Vite.

## Commands

- **Dev server:** `npm run dev` (Vite dev server with HMR)
- **Build:** `npm run build` (tsc + Vite build → `dist/`)
- **Preview:** `npm run preview` (serves production build locally)
- **Type check:** `npm run check` (runs `tsc`)

No test framework is configured.

## Architecture

Standard Vite + React SPA:

```
src/           → React application source
assets/        → Static images (logo, photos)
index.html     → Entry point
```

### Path aliases

| Alias | Maps to |
|-------|---------|
| `@/*` | `src/*` |

### Stack

- **Routing:** wouter (`/` → Home, `/formacion` → Formacion training portal)
- **UI components:** shadcn/ui (new-york style) in `src/components/ui/` — use the shadcn CLI to add new components
- **Styling:** Tailwind CSS v3 with CSS variables for theming (defined in `src/index.css`)
- **Animations:** Framer Motion
- **Forms:** React Hook Form + Zod resolvers
- **Form submissions:** Web3Forms (external service, sends to email). Access key via `VITE_WEB3FORMS_KEY` env var.

## Key Conventions

- All user-facing text is in Spanish
- Static assets (logo, images) go in `assets/` and are imported via relative paths
- Shared utility functions (e.g. `scrollToSection`) are centralized in `src/lib/utils.ts`
- The Home page is composed of section components: Navbar, Hero, WhyChoose, Services, Process, Testimonials, Collaborate, ContactForms, Footer
