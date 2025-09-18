# diagnostics-svelteui

Azure Portal Extensions Dashboard ported to Svelte 4 using SvelteUI.

## 🚀 Features

- **Modern Svelte 4** with TypeScript support
- **SvelteUI Components** for beautiful, accessible UI
- **Vite** for fast development and building
- **Vitest** for comprehensive testing with coverage
- **CI/CD** with GitHub Actions

## 📋 Prerequisites

- Node.js 22.x or later
- npm

## 🛠️ Development

### Install Dependencies

```bash
npm install
```

### Run in Development Mode

```bash
npm run dev
```

This starts the development server with hot module replacement.

### Build for Production

```bash
npm run build
```

Builds the project for production to the `dist` folder.

### Preview Production Build

```bash
npm run preview
```

Serves the production build locally for testing.

### Run Tests

```bash
npm test
```

Runs all tests once.

### Run Tests with Coverage

```bash
npm run test:coverage
```

Runs tests and generates coverage reports.

### Run Tests in Watch Mode

```bash
npm run test:watch
```

Runs tests in watch mode for development.

### Type Checking

```bash
npm run check
```

Runs TypeScript and Svelte type checking.

### Format Code

```bash
npm run format
```

Formats all code using Prettier.

## 🧪 Testing

This project uses **Vitest** for testing.

- **Component testing** with `@testing-library/svelte`
- **Mocking** for stores and external dependencies

## 🚀 CI/CD

This project includes GitHub Actions CI/CD with:

- **Automated testing** on every push and PR
- **Multi-Node.js version support** (currently 22.x)
- **Code coverage** reporting to Codecov
- **Build verification** before deployment
- **Artifact storage** for coverage reports

### CI Workflow

The CI pipeline runs on:

- Push to `main` branch
- Pull requests to `main` branch

It performs:

1. Dependency installation
2. Type checking
3. Production build
4. Test execution with coverage
5. Coverage report upload

## 🛠️ Technologies Used

- **Svelte 4** - Modern reactive framework
- **TypeScript** - Type-safe JavaScript
- **SvelteUI** - Component library
- **Vite** - Build tool and dev server
- **Vitest** - Testing framework
- **@testing-library/svelte** - Component testing utilities
- **Prettier** - Code formatting
- **svelte-check** - Type checking and linting for Svelte components
