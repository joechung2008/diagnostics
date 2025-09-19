# diagnostics

A Turborepo monorepo containing diagnostic implementations and examples for various UI component libraries and frameworks.

## Quick Start

```bash
# Install dependencies
pnpm install

# Build all packages
pnpm run build

# Test all packages
pnpm run test
```

## Packages

This monorepo includes diagnostic implementations for:

### React

- `antd/` - Ant Design components
- `blueprint/` - Blueprint.js components
- `bootstrap/` - Bootstrap components
- `carbon/` - IBM Carbon Design System
- `chakra/` - Chakra UI components
- `fluentui/` - Microsoft Fluent UI
- `grommet/` - Grommet components
- `heroui/` - Hero UI components
- `mantine/` - Mantine components
- `mui/` - MUI (Material-UI) v5+
- `naive/` - Naive UI components
- `next/` - Microsoft Fluent UI on Next.js
- `shadcn/` - shadcn/ui components
- `spectrum/` - Adobe Spectrum components
- `tremor/` - Tremor components

### Angular

- `material/` - Material-UI components

### Svelte

- `flowbite-svelte/` - Flowbite Svelte components
- `skeleton/` - Skeleton components
- `svelteui/` - Svelte UI components
- `smui/` - SMUI (Svelte Material UI) components

### Vue

- `bootstrap-vue/` - Vue 3 Bootstrap components
- `element-plus/` - Element Plus components
- `nuxt-ui/` - Nuxt UI components
- `vuetify/` - Vuetify components

### SolidJS
- `solidjs-suid/` - SolidJS SUID components

## Development

Each package provides its own scripts:

- `pnpm run dev` - Start development server
- `pnpm run build` - Build for production
- `pnpm run format` - Format code
- `pnpm run lint` - Lint code

## Deployments

- [Flowbite Svelte](https://atdiagnostics-flowbite-svelte.onrender.com/)
- [Vuetify](https://atdiagnostics-vuetify.onrender.com/)

## Troubleshooting

### React Type Conflicts

Some packages target React 18 and others React 19. pnpm may install multiple `@types/react` majors which breaks TypeScript composite builds.

**Quick fixes:**

- Add package-local `@types/react` pin to React 19 packages (e.g., `"@types/react": "19.1.12"`)
- Add type shim in `src/types/*.d.ts` to declare problematic modules as `React.ComponentType`
