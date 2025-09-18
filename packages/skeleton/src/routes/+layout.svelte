<script lang="ts">
	import '../app.css';
	import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';
	import { browser } from '$app/environment';
	import favicon from '$lib/assets/favicon.ico';

	const queryClient = new QueryClient();
	let { children } = $props();

	if (browser) {
		import('$lib').then(({ reportWebVitals }) => {
			reportWebVitals(console.log);
		});
	}
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<meta
		name="description"
		content="Information about extensions in the Azure portal"
	/>
	<title>Azure Portal Extensions Dashboar</title>
</svelte:head>

<QueryClientProvider client={queryClient}>
	{@render children?.()}
</QueryClientProvider>
