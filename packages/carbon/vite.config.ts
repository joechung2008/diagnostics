import { defineConfig } from 'vite';
import devtoolsJson from 'vite-plugin-devtools-json';
import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig({
	plugins: [sveltekit(), devtoolsJson()],
	resolve: { conditions: ['browser'] },
	test: {
		coverage: {
			include: ['src/**/*.{js,svelte,ts}'],
			exclude: ['src/test-setup.ts', 'src/**/*.d.ts'],
			provider: 'v8'
		},
		environment: 'jsdom',
		expect: { requireAssertions: true },
		globals: true,
		include: ['src/**/*.{test,spec}.{js,ts}'],
		exclude: ['src/**/*.svelte.{test,spec}.{js,ts}'],
		setupFiles: ['./src/test-setup.ts']
	}
});
