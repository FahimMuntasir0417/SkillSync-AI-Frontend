# SkillSync AI Frontend

## Overview

SkillSync AI is an AI-powered learning and career assistant frontend. It helps users generate learning roadmaps, analyze skill gaps, get project recommendations, and chat with an AI learning assistant.

## Features

- Authentication
- Dashboard
- AI Roadmap Generator
- AI Skill Gap Analyzer
- AI Project Recommender
- AI Chat Assistant
- Saved Roadmaps
- Profile Management
- Settings

## Tech Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- TanStack Query
- Axios
- Zod
- React Hook Form
- Zustand
- Sonner
- Lucide React
- Bun

## Environment Variables

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api/v1
```

Keep local secrets in `.env`. Commit only `.env.example`.

## Installation

```bash
bun install
```

## Development

```bash
bun run dev
```

## Type Check

```bash
bun run typecheck
```

## Lint

```bash
bun run lint
```

## Build

```bash
bun run build
```

## Full Check

```bash
bun run check
```

## Folder Structure

- `src/app` - Next.js App Router layouts, route groups, public pages, auth pages, and dashboard pages
- `src/components` - shared UI and layout components
- `src/features` - feature modules with forms, hooks, schemas, services, and state
- `src/lib` - API client, API error helpers, auth session utilities, and shared helpers
- `src/contracts` - Zod API response contracts for backend integration
- `src/providers` - app-level providers such as TanStack Query
- `src/types` - shared TypeScript types

## Backend Dependency

This frontend expects the SkillSync AI backend API to run at `NEXT_PUBLIC_API_BASE_URL`.

Core expected endpoints:

- `POST /auth/login`
- `POST /auth/register`
- `POST /auth/logout`
- `GET /auth/me`
- `POST /ai/roadmap`
- `POST /ai/skill-gap`
- `POST /ai/project-recommendations`
- `POST /ai/chat`

## Contest Readiness

SkillSync AI Frontend is structured to demonstrate strong frontend engineering through feature-based modules, typed forms, reusable UI components, API services, global query handling, and clean route organization.

The AI features are integrated as real dashboard tools with validation, loading states, error handling, result views, and API-ready service boundaries.

The project is prepared for production hardening through strict TypeScript, linting, build checks, environment isolation, Zod response contracts, and a scalable architecture that can grow without rewriting the application.

## UI/UX Highlights

- Premium SaaS dashboard design
- Responsive mobile-first layout
- Reusable design system
- Polished AI feature workflows
- Loading, empty, and error states
- Accessible form components
