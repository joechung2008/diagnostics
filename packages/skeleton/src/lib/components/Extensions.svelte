<script lang="ts">
	import { Navigation } from '@skeletonlabs/skeleton-svelte';
	import { byKey, isExtensionInfo, toNavLink } from '$lib';

	const { extensions, onLinkClick }: ExtensionsProps = $props();

	const links = $derived.by(() =>
		Object.values(extensions).filter(isExtensionInfo).map(toNavLink).sort(byKey)
	);
</script>

<aside
	class="flex max-h-[max-content] flex-col gap-2 overflow-x-hidden overflow-y-auto p-1"
>
	<nav class="flex flex-col" aria-label="Extensions">
		{#each links as link (link.key)}
			<Navigation.Tile
				id={link.key}
				aspect="aspect-[16,10]"
				classes="flex-col items-start justify-center"
				label={link.name}
				labelBase="text-md"
				onclick={() => onLinkClick?.(link)}
			/>
		{/each}
	</nav>
</aside>
