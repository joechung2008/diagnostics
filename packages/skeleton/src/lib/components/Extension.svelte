<script lang="ts">
	import Configuration from './Configuration.svelte';
	import StageDefinition from './StageDefinition.svelte';

	const { config, extensionName, stageDefinition }: ExtensionProps = $props();
</script>

<div
	class="flex flex-1 flex-col gap-4 overflow-y-auto"
	role="tabpanel"
	tabindex="0"
>
	<h3 class="text-lg font-semibold">{extensionName}</h3>
	{#if config}
		<Configuration {config} />
	{/if}
	{#if stageDefinition}
		<StageDefinition {stageDefinition} />
	{/if}
</div>
