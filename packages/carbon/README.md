# diagnostics-carbon

Azure Portal Extensions Dashboard implemented in Svelte 5 with Carbon Components

## Features

- Svelte 5 + Carbon Components Svelte
- Component-driven UI for build, server and extension info
- Unit testing with Vitest and Testing Library
- ESLint and Prettier configured for consistent code style

## Quick start

Requirements: Node 18+ and npm (or a compatible package manager).

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview production build locally:

```bash
npm run preview
```

Run tests:

```bash
npm run test
```

Run tests with coverage report:

```bash
npm run test:coverage
```

Run type checking/watch helpers:

```bash
npm run watch
```

Format and lint:

```bash
npm run format
npm run lint
```

## Project structure

- `src/` — application source code
  - `lib/components` — Svelte components (BuildInfo, ServerInfo, Extensions, etc.)
  - `routes` — SvelteKit pages and layouts
- `static/` — static assets served by the app
- `coverage/` — generated test coverage HTML and assets

## Notes

- UI components are built using `carbon-components-svelte`. See
  `package.json` for full dependency and script details.
- The project ships examples and unit tests in `src/lib` to help you
  extend functionality quickly.
