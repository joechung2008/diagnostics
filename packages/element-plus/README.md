# diagnostics-element-plus

Azure Portal Extensions Dashabord implemented in Nuxt 4 with Element Plus

## Features

- Small, focused Nuxt application built with TypeScript and Element Plus
- Component-per-file pattern with companion `*.ts` type files under `app/types`
- Zero-backend: the app is a static frontend intended to render diagnostics data
- Lightweight unit tests with `vitest` and `@vue/test-utils`
- CI workflow to run builds, tests, and upload coverage artifacts

## Getting started

Prerequisites

- Node.js 22+ (LTS recommended)
- npm

Install dependencies

```bash
npm ci
```

Run the dev server

```bash
npm run dev
```

Open the URL printed by Nuxt (default http://localhost:3000/) to view the app.

Build for production

```bash
npm run build
```

Preview the production build locally

```bash
npm run preview
```

## Tests and coverage

Run unit tests

```bash
npm test
```

Run tests with coverage (produces a `coverage/` directory)

```bash
npm run test:coverage
```

Open `coverage/index.html` in a browser (or inspect the `coverage` folder) to
view the generated report locally. In CI the coverage output is uploaded as an
artifact named `coverage-report` (see `.github/workflows/ci.yml`).

## Project layout

Top-level files

- `nuxt.config.ts` — Nuxt configuration
- `package.json` — npm scripts and dependencies
- `vitest.config.ts` — test configuration (multiple projects)
- `tsconfig.json` — TypeScript configuration
- `.github/workflows/ci.yml` — CI workflow

Key folders

- `app/` — application source (views, components, assets)
  - `components/` — Vue components used by the app
  - `types/` — shared TypeScript interfaces and props
  - `assets/` — styles and static assets
- `test/` — unit and integration tests
  - `setupTests.ts` — global test setup (stubs, environment patches)
- `public/` — static files served by Nuxt

## Conventions

- Components live in `app/components` as single-file `.vue` components.
- Public/shared types live in `app/types`.
- Add unit tests for new behavior in `test/unit` (matching `*.test.ts` or
  `*.spec.ts`). The repository uses a two-project Vitest setup: a `unit`
  project (jsdom) and a `nuxt` project (Nuxt environment).

## Linting and formatting

- ESLint is configured via `eslint.config.mjs`. Run:

```bash
npm run lint
```

- Format with Prettier:

```bash
npm run format
```
