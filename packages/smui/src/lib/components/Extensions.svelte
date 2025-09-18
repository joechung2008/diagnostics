<script lang="ts">
	import { byKey, isExtensionInfo, toNavLink } from '$lib';
	import List, { Item } from '@smui/list';

	const { extensions, onLinkClick }: ExtensionsProps = $props();

	const links = $derived(
		Object.values(extensions).filter(isExtensionInfo).map(toNavLink).sort(byKey)
	);
</script>

<div class="extension-root">
	<List aria-label="Extensions" class="extension-root">
		{#each links as link (link.name)}
			<Item onSMUIAction={(e) => onLinkClick?.(e, link)}>
				{link.name}
			</Item>
		{/each}
	</List>
</div>

<style scoped>
	.extension-root {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		max-height: max-content;
		overflow-y: auto;
		padding: 0.25rem;
	}
</style>
