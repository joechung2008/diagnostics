<script lang="ts">
	export let stageDefinition: Record<string, string[]>;
</script>

<div>
	<h2 id="stage-definitions" class="mb-2 text-sm font-semibold">
		Stage Definitions
	</h2>
	<table
		aria-labelledby="stage-definitions"
		class="divide-surface-2 min-w-full divide-y"
	>
		<thead class="bg-surface-1">
			<tr>
				<th class="px-4 py-2 text-left">Key</th>
				<th class="px-4 py-2 text-left">Value</th>
			</tr>
		</thead>
		<tbody class="[&>tr]:border-surface-2 [&>tr]:border-b">
			{#each Object.entries(stageDefinition) as [key, value] (key)}
				<tr class="[&:hover]:preset-tonal-primary">
					<td class="px-4 py-2">{key}</td>
					<td class="px-4 py-2">{value.join(', ')}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
