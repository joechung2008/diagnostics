<script lang="ts">
	import Configuration from './Configuration.svelte';
	import StageDefinition from './StageDefinition.svelte';

	const { extensionName, config, stageDefinition }: ExtensionProps = $props();
</script>

<div class="extension-root grow" role="tabpanel" tabindex="0">
	<h1 class="mdc-typography--headline4">{extensionName}</h1>
	{#if config}
		<Configuration {config} />
	{/if}
	{#if stageDefinition}
		<StageDefinition {stageDefinition} />
	{/if}
</div>

<style scoped>
	.extension-root {
		display: flex;
		flex-direction: column;
		margin: 4px;
		overflow-y: auto;
	}

	.grow {
		flex: 1;
	}
</style>
