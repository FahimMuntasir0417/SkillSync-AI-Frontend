# SkillSync AI

A structured Next.js frontend starter using App Router, TypeScript, TanStack Query, Axios, and Zod contracts.

## Architecture

```text
Page / Component
  -> Feature hook
  -> Service module
  -> Shared HTTP client
  -> Backend API
  -> Zod response contract
```

## Folders

- `src/app` - Next.js App Router pages and layouts
- `src/components` - shared UI components
- `src/config` - environment and auth constants
- `src/contracts` - Zod request and response schemas
- `src/features` - feature-specific hooks and exports
- `src/lib` - shared clients, parsing, errors, auth helpers, utilities
- `src/providers` - app-level React providers
- `src/services` - API service modules
- `src/types` - shared TypeScript types
