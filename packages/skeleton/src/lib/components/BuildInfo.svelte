<script lang="ts">
	export let buildVersion: string;
</script>

<table class="divide-surface-2 min-w-full divide-y">
	<caption class="sr-only">Build Info</caption>
	<thead class="bg-surface-1">
		<tr>
			<th class="px-4 py-2 text-left">Name</th>
			<th class="px-4 py-2 text-left">Value</th>
		</tr>
	</thead>
	<tbody class="[&>tr]:border-surface-2 [&>tr]:border-b">
		<tr class="[&:hover]:preset-tonal-primary">
			<td class="px-4 py-2">Build Version</td>
			<td class="px-4 py-2">{buildVersion}</td>
		</tr>
	</tbody>
</table>

<h2 id="buildinfo-heading" class="sr-only">Build Info</h2>
