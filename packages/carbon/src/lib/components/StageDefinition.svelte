<script lang="ts">
	import { DataTable } from 'carbon-components-svelte';

	const { stageDefinition }: StageDefinitionProps = $props();

	const headers = [
		{ key: 'key', value: 'Key', empty: false },
		{ key: 'value', value: 'Value', empty: false }
	];

	const rows = $derived(
		Object.entries(stageDefinition).map(([key, value]) => ({
			id: key,
			key,
			value: value.join(', ')
		}))
	);
</script>

<h2 id="stage-definitions">Stage Definition</h2>
<DataTable aria-labelledby="stage-definitions" {headers} {rows} />
