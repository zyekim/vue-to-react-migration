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

## First exercise

Create a responsive fictional profile page without copying an existing product. Start with static typed props, then add synthetic async data, loading, empty, and error states.

## Publication safety

Before every push, verify that the repository contains no employer code, names, logos, screenshots, UI copy, API paths, schemas, credentials, hostnames, business rules, customer data, or Git history.
