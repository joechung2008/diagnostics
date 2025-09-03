# diagnostics

A modern React TypeScript application for diagnostics and monitoring.

## Prerequisites

- Node.js >= 22
- npm >= 10

## Getting Started

### Installation

```sh
npm install
```

### Development

Start the development server:

```sh
npm run dev
```

The application will be available at `http://localhost:3000` and will automatically open in your browser.

Alternatively, you can use the start command:

```sh
npm start
```

## Building

### Production Build

Build the application for production:

```sh
npm run build
```

This command will:

1. Type-check the code using TypeScript
2. Bundle and optimize the application using Vite

The built files will be output to the `build` directory (configurable via `BUILD_PATH` environment variable).

### Environment Variables

You can customize the build process using the following environment variables:

- `BUILD_PATH`: Output directory for built files (default: `build`)
- `GENERATE_SOURCEMAP`: Generate source maps for production build (default: false)
- `PUBLIC_URL`: Base URL for the application (default: based on package.json homepage)

## Formatting

Format code using Prettier:

```sh
npm run format
```

This will format all JavaScript, TypeScript, JSON, and markdown files in the project using the configuration from `.prettierrc`.

## Linting

Lint the codebase using ESLint:

```sh
npm run lint
```

ESLint is configured to check TypeScript and React files with:

- TypeScript ESLint recommendations
- React specific rules
- Prettier integration for code style consistency
- Hot module replacement compatible rules

## Testing

### Run Tests

Run the test suite once:

```sh
npm run test
```

### Watch Mode

Run tests in watch mode (re-runs on file changes):

```sh
npm run test:watch
```

### Coverage Report

Run tests with coverage report:

```sh
npm run test:coverage
```

Coverage reports will exclude:

- `src/reportWebVitals.ts`
- All TypeScript declaration files (`*.d.ts`)

## Environment Configuration

### Development Server

The development server supports the following configuration options:

- `HOST`: Server host (default: `0.0.0.0`)
- `PORT`: Server port (default: `3000`)
- `HTTPS`: Enable HTTPS (default: false)
- `SSL_CRT_FILE`: Path to SSL certificate file for HTTPS
- `SSL_KEY_FILE`: Path to SSL key file for HTTPS

### Environment Variables

Use `REACT_APP_` prefixed variables to expose environment variables to your React application:

```sh
# .env file
REACT_APP_API_URL=https://api.example.com
```

## Project Structure

```
src/
├── components/          # React components
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
├── index.tsx           # Application entry point
├── index.css           # Global styles
└── App.tsx            # Main application component

public/
├── index.html          # HTML template
├── manifest.json       # Web app manifest
├── robots.txt          # Search engine crawling instructions
└── favicon.ico         # Application favicon
```

## Dependencies

### Runtime Dependencies

- React 18
- @fluentui/react-components - UI component library
- @fluentui/react-theme - Theme system

### Development Dependencies

- TypeScript - Type checking
- Vite - Build tool and dev server
- Vitest - Testing framework
- ESLint - Code linting
- Prettier - Code formatting
- Testing Library - React testing utilities

## Scripts Overview

| Command                 | Description                              |
| ----------------------- | ---------------------------------------- |
| `npm run dev`           | Start development server                 |
| `npm run build`         | Build for production                     |
| `npm run start`         | Start development server (alias for dev) |
| `npm run lint`          | Lint code using ESLint                   |
| `npm run format`        | Format code using Prettier               |
| `npm run test`          | Run tests once                           |
| `npm run test:watch`    | Run tests in watch mode                  |
| `npm run test:coverage` | Run tests with coverage                  |

## Browser Support

### Production

- Chrome: > 0.2% usage
- Firefox: > 0.2% usage
- Safari: > 0.2% usage
- Edge: > 0.2% usage
- Not Opera Mini

### Development

- Latest Chrome
- Latest Firefox
- Latest Safari

## Contributing

1. Follow the coding standards enforced by ESLint and Prettier
2. Write tests for new features
3. Ensure all tests pass before submitting changes
4. Format code before committing using `npm run format`
