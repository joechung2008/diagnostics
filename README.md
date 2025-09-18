# Diagnostics monorepo

This repository is set up as a Turborepo monorepo using pnpm workspaces.

Quick commands (pnpm):

- Install deps (root, workspace install): `pnpm install`
- Start dev (runs turbo dev): `pnpm run dev`
- Build all packages: `pnpm run build`

Each package lives under `packages/` and may provide its own scripts for `dev`, `build`, and `lint`.

## Note about running tests

Running `pnpm run test` from the repo root (Turbo) can sometimes fail for the Angular package because the spawned test process may not find a Chrome binary. If you hit this, run the package-local test instead:

    cd packages/material && pnpm test
