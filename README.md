# Diagnostics monorepo

This repository is set up as a Turborepo monorepo using pnpm workspaces.

Quick commands (pnpm):

- Install deps (root, workspace install): `pnpm install`
- Start dev (runs turbo dev): `pnpm run dev`
- Build all packages: `pnpm run build`
- Run tests: `pnpm run test`

Each package lives under `packages/` and may provide its own scripts for `dev`, `build`, `test`, and `lint`.
