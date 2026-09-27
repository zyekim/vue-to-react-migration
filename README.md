# React Learning Ops

An independent learning repository for studying React fundamentals and migrating UI patterns and screens previously built with Vue to React. All names and data are fictional. This repository is not affiliated with any employer or commercial service.

## Commands

- `npm run dev`
- `npm run build`
- `npm run typecheck`
- `npm run lint`
- `npm run test`
- `npm run format`

## Add a shadcn/ui component

```bash
npx shadcn@latest add card
```

Generated UI source belongs in `src/shared/ui`. Add components only when a real screen needs them.

## Architecture

- `src/app`: global assembly, router, providers, and styles
- `src/pages`: thin route entry points
- `src/features`: business-facing feature modules
- `src/shared`: reusable UI and framework-neutral utilities

## Learning tracks

This repository records React study in two connected tracks.

- **Fundamentals** (`/lessons`): controlled inputs, immutable updates, effects, custom hooks, composition, and context
- **Applied UI** (`src/features`, `src/pages`): forms, dialogs, tables, pagination, routing, tests, and mocked API communication

Small exercises stay intentionally simple. When a concept is understood, it is applied to a fictional admin screen instead of adding unnecessary abstractions.

The fundamentals page consolidates the ongoing DAY 03–09 exercises from the separate rescue workspace. The original Vite scaffold and dependencies are intentionally not duplicated.

## First exercise

Open `/my-page` to study a responsive fictional profile page. The feature uses a typed Promise-based mock query with loading, success, error, and retry states. Replacing that query boundary with a real API adapter should not require presentation-component changes.

Suggested follow-up exercises:

1. Add a profile edit form with validation.
2. Replace the mock query with an HTTP adapter.
3. Move server-state handling to TanStack Query and compare the code.

## Publication safety

Before every push, verify that the repository contains no employer code, names, logos, screenshots, UI copy, API paths, schemas, credentials, hostnames, business rules, customer data, or Git history.
