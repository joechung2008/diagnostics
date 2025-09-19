import { sveltekit } from '@sveltejs/kit/vite';
import devtoolsJson from 'vite-plugin-devtools-json';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [sveltekit(), devtoolsJson()],
	resolve: {
		...(process.env.VITEST ? { conditions: ['browser'] } : undefined)
	},
	test: {
		coverage: {
			exclude: ['src/test-setup.ts', 'src/**/*.d.ts'],
			include: ['src/**/*.{js,svelte,ts}'],
			provider: 'v8'
		},
		environment: 'jsdom',
		globals: true,
		setupFiles: ['./src/test-setup.ts']
	}
});
