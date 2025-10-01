# diagnostics

Azure Portal Extensions Dashboard implemented in React 18 with Fluent UI 9.

## Quick start

Prerequisites:

- Node.js >= 22
- npm >= 10

Install dependencies and run locally:

```bash
npm install
npm run dev
```

Open http://localhost:3000 in your browser. The dev server supports hot module replacement.

## Features

- Environment switching (select from configured Azure environments)
- View build information, server metadata, and loaded extensions
- Lightweight UI using Fluent UI v9
- Frontend-only — no backend server included in this repo

## Project layout

Top-level structure (relevant files):

- `src/` — application source code
  - `index.tsx` — app entry
  - `App.tsx` — main application component (environment selection, data fetching, tabs)
  - `Extensions.tsx`, `Extension.tsx` — extension listing and details
  - `BuildInfo.tsx`, `ServerInfo.tsx` — UI for build and server metadata
  - `useDiagnostics.ts` — data-fetching hook
  - `utils.ts`, `types.d.ts` — helpers and type definitions
- `public/` — static assets (HTML template, favicon, robots)
- `index.html` — HTML template

## Scripts

Common scripts available in `package.json`:

```text
npm run dev           # start development server
npm run build         # build for production
npm start             # alias for dev
npm run lint          # run ESLint
npm run format        # run Prettier
npm run test          # run unit tests once
npm run test:watch    # run unit tests in watch mode
npm run test:coverage # run unit tests with coverage
npm run test:e2e      # run e2e tests
npm run test:e2e:ui   # run e2e tests in interactive UI mode
```

## Building for production

```bash
npm run build
```

The build step runs TypeScript checks and produces static files in the `build` directory by default.

## Testing

### Unit Tests

Run tests:

```bash
npm run test
```

Watch mode:

```bash
npm run test:watch
```

Coverage report:

```bash
npm run test:coverage
```

### End-to-End Tests

The project includes Playwright e2e tests. First, install Playwright browsers:

```bash
pnpm exec playwright install --with-deps
```

Then run the e2e tests:

```bash
npm run test:e2e
```

For interactive test development:

```bash
npm run test:e2e:ui
```

## Formatting & linting

Format with Prettier:

```bash
npm run format
```

Lint with ESLint:

```bash
npm run lint
```
