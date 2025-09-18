<script lang="ts">
	import { DataTable } from 'carbon-components-svelte';

	const { config }: ConfigurationProps = $props();

	const headers = [
		{ key: 'key', value: 'Key', empty: false },
		{ key: 'value', value: 'Value', empty: false }
	];

	const rows = $derived(Object.entries(config).map(([key, value]) => ({ id: key, key, value })));
</script>

<h2 id="configuration">Configuration</h2>
<DataTable aria-labelledby="configuration" {headers} {rows} />
