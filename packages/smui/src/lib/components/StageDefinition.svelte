<script lang="ts">
	const { stageDefinition }: StageDefinitionProps = $props();

	const items = $derived(
		Object.entries(stageDefinition).map(([key, value]) => ({ key, value }))
	);
</script>

<div>
	<h2 id="stage-definitions" class="mdc-typography--headline5">
		Stage Definitions
	</h2>
	<table aria-labelledby="stage-definitions">
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
					<td class="mdc-typography--body1">{item.value.join(', ')}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
