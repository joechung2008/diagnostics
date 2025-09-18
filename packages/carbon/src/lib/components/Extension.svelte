<script lang="ts">
	import Configuration from './Configuration.svelte';
	import StageDefinition from './StageDefinition.svelte';

	let { extensionName, config, stageDefinition }: ExtensionProps = $props();
</script>

<div class="extension-root" role="tabpanel" tabindex="0">
	<h1>{extensionName}</h1>
	{#if config}
		<Configuration {config} />
	{/if}
	{#if stageDefinition}
		<StageDefinition {stageDefinition} />
	{/if}
</div>

<style>
	.extension-root {
		display: flex;
		flex: 1;
		flex-direction: column;
		gap: 0.5rem;
		overflow-y: auto;
		padding: 0.5rem;
	}
</style>
