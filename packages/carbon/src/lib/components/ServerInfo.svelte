<script lang="ts">
	import { DataTable } from 'carbon-components-svelte';

	const { deploymentId, extensionSync, hostname, nodeVersions, serverId, uptime }: ServerInfoProps =
		$props();

	const headers = [
		{ key: 'name', value: 'Name', empty: false },
		{ key: 'value', value: 'Value', empty: false }
	];

	const rows = $derived([
		{ id: 'hostname', name: 'Hostname', value: hostname },
		{ id: 'uptime', name: 'Uptime', value: uptime },
		{ id: 'server-id', name: 'Server ID', value: serverId },
		{ id: 'deployment-id', name: 'Deployment ID', value: deploymentId },
		{ id: 'node-versions', name: 'Node Versions', value: nodeVersions },
		{
			id: 'extension-sync',
			name: 'Extension Sync | Total Sync All Count',
			value: extensionSync.totalSyncAllCount
		}
	]);
</script>

<DataTable aria-label="Server Information" {headers} {rows} />
