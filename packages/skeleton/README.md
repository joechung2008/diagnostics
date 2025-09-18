# diagnostics-skeleton

Azure Portal Extensions Dashboard ported to Svelte 5 using Svelte Skeleton.

## 🚀 Features

- Modern Svelte 5 + TypeScript project structure
- Reusable UI components for an extensions dashboard (Build, Server, Extensions)
- TanStack Query integration for data fetching (mocked in tests)
- Fast dev server with Vite and component testing with Vitest

## 📋 Prerequisites

- Node.js 22.x or later
- npm (comes with Node.js)

Make sure you have a compatible Node.js version installed before continuing.

## 🛠️ Development

### Install dependencies

```bash
npm install
```

### Run in development mode

```bash
npm run dev
```

This starts the Vite dev server with hot module replacement.

### Build for production

```bash
npm run build
```

Builds the project for production.

### Preview production build

```bash
npm run preview
```

Serves the production build locally for testing.

### Type checking

```bash
npm run check
```

Runs Svelte + TypeScript checks (uses `svelte-check` and project config).

### Format code

```bash
npm run format
```

Formats the repository with Prettier and configured plugins.

## 🧪 Testing

This project uses Vitest for testing and @testing-library/svelte for component tests.

- Run all tests once:

```bash
npm test
```

- Run tests with coverage:

```bash
npm run test:coverage
```

- Run tests in watch mode:

```bash
npm run test:watch
```

Notes:

- The test setup file (`src/vitest.setup.ts`) includes small polyfills used by jsdom (e.g. a no-op ResizeObserver and a matchMedia mock).
- Tests mock the TanStack Query store where necessary; see `src/routes/page.test.ts` for an example of how the query store is mocked inline.

## 🛠️ Technologies Used

- Svelte 5
- TypeScript
- Vite
- Vitest (with @vitest/coverage-v8)
- @testing-library/svelte
- @tanstack/svelte-query
- Skeleton UI components (`@skeletonlabs/skeleton`)
- Tailwind-related tooling and Prettier for formatting
