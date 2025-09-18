<script lang="ts">
	import { byKey, isExtensionInfo, toNavLink } from '$lib';
	import { SideNavLink } from 'carbon-components-svelte';

	let { extensions, onLinkClick }: ExtensionsProps = $props();

	let links = $derived(
		Object.values(extensions).filter(isExtensionInfo).map(toNavLink).sort(byKey)
	);
</script>

{#each links as link (link.key)}
	<SideNavLink text={link.name} on:click={() => onLinkClick(link)} />
{/each}
