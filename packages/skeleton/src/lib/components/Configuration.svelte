<script lang="ts">
	export let config: Record<string, string>;
</script>

<div>
	<h2 id="configuration" class="mb-2 text-sm font-semibold">Configuration</h2>
	<table
		aria-labelledby="configuration"
		class="divide-surface-2 min-w-full divide-y"
	>
		<thead class="bg-surface-1">
			<tr>
				<th class="px-4 py-2 text-left">Key</th>
				<th class="px-4 py-2 text-left">Value</th>
			</tr>
		</thead>
		<tbody class="[&>tr]:border-surface-2 [&>tr]:border-b">
			{#each Object.entries(config) as [key, value] (key)}
				<tr class="[&:hover]:preset-tonal-primary">
					<td class="px-4 py-2">{key}</td>
					<td class="px-4 py-2">{value}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
