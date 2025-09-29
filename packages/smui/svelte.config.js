import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
// Consult https://svelte.dev/docs/kit/integrations
// for more information about preprocessors
const config = {
	preprocess: vitePreprocess(),
	kit: {
		// adapter-node is suitable for Node.js SSR deployments.
		// See https://svelte.dev/docs/kit/adapters for more information about adapters.
		adapter: adapter()
	}
};

export default config;
