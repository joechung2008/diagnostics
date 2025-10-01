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

- `antd/` - Ant Design components [🔗](https://atdiagnostics-antd.onrender.com/)
- `blueprint/` - Blueprint.js components [🔗](https://atdiagnostics-blueprint.onrender.com/)
- `bootstrap/` - Bootstrap components [🔗](https://atdiagnostics-bootstrap.onrender.com/)
- `chakra/` - Chakra UI components [🔗](https://atdiagnostics-chakra.onrender.com/)
- `fluentui/` - Microsoft Fluent UI [🔗](https://atdiagnostics-fluentui.onrender.com/)
- `grommet/` - Grommet components [🔗](https://atdiagnostics-grommet.onrender.com/)
- `heroui/` - Hero UI components [🔗](https://atdiagnostics-heroui.onrender.com/)
- `mantine/` - Mantine components [🔗](https://atdiagnostics-mantine.onrender.com/)
- `mui/` - MUI (Material-UI) v5+ [🔗](https://atdiagnostics-mui.onrender.com/)
- `next/` - Microsoft Fluent UI on Next.js [🔗](https://atdiagnostics-next.onrender.com/)
- `shadcn/` - shadcn/ui components [🔗](https://atdiagnostics-shadcn.onrender.com/)
- `spectrum/` - Adobe Spectrum components [🔗](https://atdiagnostics-spectrum.onrender.com/)
- `tremor/` - Tremor components [🔗](https://atdiagnostics-tremor.onrender.com/)

### Angular

- `material/` - Material-UI components [🔗](https://atdiagnostics-material.onrender.com/)

### Svelte

- `carbon/` - IBM Carbon Design System [🔗](https://atdiagnostics-carbon.onrender.com/)
- `flowbite-svelte/` - Flowbite Svelte components [🔗](https://atdiagnostics-flowbite-svelte.onrender.com/)
- `skeleton/` - Skeleton components [🔗](https://atdiagnostics-skeleton.onrender.com/)
- `smui/` - SMUI (Svelte Material UI) components [🔗](https://atdiagnostics-smui.onrender.com/)
- `svelteui/` - Svelte UI componentss [🔗](https://atdiagnostics-svelteui.onrender.com/)

### Vue

- `bootstrap-vue/` - Vue 3 Bootstrap components [🔗](https://atdiagnostics-bootstrap-vue.onrender.com/)
- `element-plus/` - Element Plus components [🔗](https://atdiagnostics-element-plus.onrender.com/)
- `naive/` - Naive UI components [🔗](https://atdiagnostics-naive.onrender.com/)
- `nuxt-ui/` - Nuxt UI components [🔗](https://atdiagnostics-nuxt-ui.onrender.com/)
- `quasar/` - Quasar components [🔗](https://atdiagnostics-quasar.onrender.com/)
- `vuetify/` - Vuetify components [🔗](https://atdiagnostics-vuetify.onrender.com/)

### SolidJS
- `solidjs-suid/` - SolidJS SUID components [🔗](https://atdiagnostics-solidjs-suid.onrender.com/)

## Development

Each package provides its own scripts:

- `pnpm run dev` - Start development server
- `pnpm run build` - Build for production
- `pnpm run format` - Format code
- `pnpm run lint` - Lint code

## Troubleshooting

### React Type Conflicts

Some packages target React 18 and others React 19. pnpm may install multiple `@types/react` majors which breaks TypeScript composite builds.

**Quick fixes:**

- Add package-local `@types/react` pin to React 19 packages (e.g., `"@types/react": "19.1.12"`)
- Add type shim in `src/types/*.d.ts` to declare problematic modules as `React.ComponentType`
