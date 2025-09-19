# Diagnostics monorepo

This repository is set up as a Turborepo monorepo using pnpm workspaces.

Quick commands (pnpm):

- Install deps (root, workspace install): `pnpm install`
- Build all packages: `pnpm run build`

Each package lives under `packages/` and may provide its own scripts for `dev`, `build`, and `lint`.

## PNPM / @types/react note

Some packages target React 18 and others React 19. pnpm may install multiple `@types/react` majors which breaks TypeScript composite builds (JSX type errors).

Quick fixes:

- Package-local pin: add a suitable `@types/react` to the package that targets React 19 (example: `@types/react@19.1.12`).
- Local type shim: add `src/types/*.d.ts` in a package to declare problematic modules (e.g. `@remixicon/react`) as `React.ComponentType`.
