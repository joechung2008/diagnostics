# diagnostics-next

Azure Portal Extensions Dashboard implemented in Next.js 14 and React 18 with Fluent UI 9

## Features

- Next.js 14 application scaffolded with TypeScript support.
- Fluent UI 9 for design system components.
- Fast refresh during development and production-ready builds.
- Unit tests with Jest and React Testing Library.

## Prerequisites

- Node.js 22+
- npm

## Quick start

1. Install dependencies

```powershell
npm install
```

2. Run the development server

```powershell
npm run dev
```

Open http://localhost:3000 in your browser. Next.js will hot-reload while you edit source files.

## Available scripts

The project exposes a few convenient npm scripts (see `package.json`):

- `npm run dev` - start Next.js in development mode
- `npm run dev:turbo` - start Next.js dev with Turbo rendering
- `npm run build` - build the production app
- `npm run start` - start the production server after building
- `npm run lint` - run the configured linters
- `npm run format` - run Prettier to format files
- `npm run test` - run Jest tests
- `npm run test:ci` - run tests in CI mode and collect coverage

Example: build and run production locally

```powershell
npm run build
npm run start
```

## Testing

Unit tests are implemented with Jest and React Testing Library. To run tests locally:

```powershell
npm test
```

To run tests in CI mode (useful for CI pipelines):

```powershell
npm run test:ci
```

## Project structure

- `src/` – main React components and tests
- `app/` – Next.js app routes and global layout
- `public/` – static assets
- `__tests__/` – unit tests collocated with components

## CI / Deployment

This project is configured to be deployed on platforms that support Next.js (for example Vercel). The CI pipeline runs linting, tests, and builds — make sure your changes keep the test and lint steps green.
