import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import devtoolsJson from 'vite-plugin-devtools-json';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	build: {
		rollupOptions: {
			output: {
				manualChunks(id) {
					// Workaround for Skeleton Svelte components causing duplicate symbol errors
					if (
						id.includes('@skeletonlabs/skeleton-svelte/dist/components/Segment')
					) {
						return 'skeleton-segment';
					} else if (
						id.includes(
							'@skeletonlabs/skeleton-svelte/dist/components/Navigation'
						)
					) {
						return 'skeleton-navigation';
					} else {
						return null;
					}
				}
			}
		}
	},
	plugins: [sveltekit(), tailwindcss(), devtoolsJson()],
	resolve: { conditions: ['browser'] },
	test: {
		coverage: {
			exclude: ['src/**/*.d.ts', 'src/**/*.{spec,test}.{js,ts}'],
			include: ['src/**/*.{js,ts,svelte}']
		},
		environment: 'jsdom',
		expect: { requireAssertions: true },
		globals: true,
		setupFiles: ['./src/vitest.setup.ts']
	}
});
