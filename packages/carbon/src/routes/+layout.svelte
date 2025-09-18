<script lang="ts">
	import { browser } from '$app/environment';
	import favicon from '$lib/assets/favicon.ico';
	import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';
	import { Theme } from 'carbon-components-svelte';

	import 'carbon-components-svelte/css/all.css';

	const queryClient = new QueryClient();

	let { children } = $props();

	if (browser) {
		import('$lib').then(({ reportWebVitals }) => {
			reportWebVitals(console.log);
		});
	}
</script>

<svelte:head>
	<title>Azure Portal Extensions Dashboard</title>
	<link rel="icon" href={favicon} />
	<meta name="description" content="Information about extensions on the Azure portal" />
</svelte:head>

<QueryClientProvider client={queryClient}>
	<Theme theme="g90">
		{@render children?.()}
	</Theme>
</QueryClientProvider>
