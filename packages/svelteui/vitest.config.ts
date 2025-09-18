import { defineConfig } from 'vitest/config'
import { svelte } from '@sveltejs/vite-plugin-svelte'

export default defineConfig({
  plugins: [svelte({ hot: false })],
  test: {
    coverage: {
      exclude: ['src/**/*.d.ts', 'src/test-setup.ts'],
      include: ['src/**/*.{svelte,ts}'],
      provider: 'v8'
    },
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test-setup.ts']
  }
})
