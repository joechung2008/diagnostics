<script lang="ts">
	export let deploymentId: string;
	export let extensionSync: { totalSyncAllCount: number };
	export let hostname: string;
	export let nodeVersions: string;
	export let serverId: string;
	export let uptime: number;
</script>

<table class="divide-surface-2 min-w-full divide-y">
	<caption class="sr-only">Server Info</caption>
	<thead class="bg-surface-1">
		<tr>
			<th class="px-4 py-2 text-left">Name</th>
			<th class="px-4 py-2 text-left">Value</th>
		</tr>
	</thead>
	<tbody class="[&>tr]:border-surface-2 [&>tr]:border-b">
		<tr class="[&:hover]:preset-tonal-primary">
			<td class="px-4 py-2">Hostname</td>
			<td class="px-4 py-2">{hostname}</td>
		</tr>
		<tr class="[&:hover]:preset-tonal-primary">
			<td class="px-4 py-2">Uptime</td>
			<td class="px-4 py-2">{uptime}</td>
		</tr>
		<tr class="[&:hover]:preset-tonal-primary">
			<td class="px-4 py-2">Server ID</td>
			<td class="px-4 py-2">{serverId}</td>
		</tr>
		<tr class="[&:hover]:preset-tonal-primary">
			<td class="px-4 py-2">Deployment ID</td>
			<td class="px-4 py-2">{deploymentId}</td>
		</tr>
		<tr class="[&:hover]:preset-tonal-primary">
			<td class="px-4 py-2">Node Versions</td>
			<td class="px-4 py-2">{nodeVersions}</td>
		</tr>
		<tr class="[&:hover]:preset-tonal-primary">
			<td class="px-4 py-2">Extension Sync | Total Sync All Count</td>
			<td class="px-4 py-2">{extensionSync.totalSyncAllCount}</td>
		</tr>
	</tbody>
</table>

<h2 id="serverinfo-heading" class="sr-only">Server Info</h2>
