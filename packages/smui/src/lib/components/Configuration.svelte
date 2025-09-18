<script lang="ts">
	const { config }: ConfigurationProps = $props();

	const items = $derived(
		Object.entries(config).map(([key, value]) => ({ key, value }))
	);
</script>

<div>
	<h2 id="configuration" class="mdc-typography--headline5">Configuration</h2>
	<table aria-labelledby="configuration">
		<thead>
			<tr>
				<th class="mdc-typography--headline6">Key</th>
				<th class="mdc-typography--headline6">Value</th>
			</tr>
		</thead>
		<tbody>
			{#each items as item (item.key)}
				<tr>
					<td class="mdc-typography--body1">{item.key}</td>
					<td class="mdc-typography--body1">{item.value}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
