<script lang="ts">
	import { DataTable } from 'carbon-components-svelte';

	const { buildVersion }: BuildInfoProps = $props();

	const headers = [
		{ key: 'name', value: 'Name', empty: false },
		{ key: 'value', value: 'Value', empty: false }
	];

	const rows = $derived([{ id: 'build-version', name: 'Build Version', value: buildVersion }]);
</script>

<DataTable aria-label="Build Information" {headers} {rows} />
