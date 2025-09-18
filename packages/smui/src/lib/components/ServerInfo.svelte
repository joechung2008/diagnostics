<script lang="ts">
	const {
		deploymentId,
		extensionSync,
		hostname,
		nodeVersions,
		serverId,
		uptime
	}: ServerInfoProps = $props();

	const items = $derived([
		{ name: 'Hostname', value: hostname },
		{ name: 'Uptime', value: uptime },
		{ name: 'Server ID', value: serverId },
		{ name: 'Deployment ID', value: deploymentId },
		{ name: 'Node Versions', value: nodeVersions },
		{
			name: 'Extension Sync | Total Sync All Count',
			value: extensionSync?.totalSyncAllCount
		}
	]);
</script>

<table aria-label="Server Info">
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
