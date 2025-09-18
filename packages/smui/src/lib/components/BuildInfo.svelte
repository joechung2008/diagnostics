<script lang="ts">
	const { buildVersion }: BuildInfoProps = $props();

	const items = $derived([{ name: 'Build Version', value: buildVersion }]);
</script>

<table aria-label="Build Info">
	<thead>
		<tr>
			<th class="mdc-typography--headline6">Name</th>
			<th class="mdc-typography--headline6">Value</th>
		</tr>
	</thead>
	<tbody>
		{#each items as item (item.name)}
			<tr>
				<td class="mdc-typography--body1">{item.name}</td>
				<td class="mdc-typography--body1">{item.value}</td>
			</tr>
		{/each}
	</tbody>
</table>
