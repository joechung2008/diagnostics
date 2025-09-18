import { fileURLToPath } from 'node:url'
import { configDefaults, defineConfig, mergeConfig } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      coverage: {
        exclude: [
          '**/*.d.ts',
          '*.ts',
          'dist/**',
          'src/*.types.ts',
          'src/plugins/*.ts',
          'src/reportWebVitals.ts',
          'src/types.ts',
        ],
      },
      environment: 'jsdom',
      exclude: [...configDefaults.exclude, 'e2e/**'],
      globals: true,
      root: fileURLToPath(new URL('./', import.meta.url)),
      server: {
        deps: {
          inline: ['vue', 'vuetify'],
        },
      },
      setupFiles: ['src/__tests__/setupTests.ts'],
    },
  })
)
