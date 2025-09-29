import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: [
		// Preprocessors are run in sequence.
		// If using TypeScript, the code must be transpiled first.
		vitePreprocess()
	],

	kit: {
		adapter: adapter()
	},

	runes: true
};

export default config;
