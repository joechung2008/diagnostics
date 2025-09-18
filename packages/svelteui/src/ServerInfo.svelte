<script lang="ts">
  export let deploymentId: string
  export let extensionSync: { totalSyncAllCount: number }
  export let hostname: string
  export let nodeVersions: string
  export let serverId: string
  export let uptime: number

  const items = [
    {
      name: 'Hostname',
      value: hostname
    },
    {
      name: 'Uptime',
      value: uptime
    },
    {
      name: 'Server ID',
      value: serverId
    },
    {
      name: 'Deployment ID',
      value: deploymentId
    },
    {
      name: 'Node Versions',
      value: nodeVersions
    },
    {
      name: 'Extension Sync | Total Sync All Count',
      value: extensionSync.totalSyncAllCount
    }
  ]
</script>

<div class="table-container">
  <table aria-label="Server Information">
    <thead>
      <tr>
        <th>Name</th>
        <th>Value</th>
      </tr>
    </thead>
    <tbody>
      {#each items as item (item.name)}
        <tr>
          <td>{item.name}</td>
          <td>{item.value}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<style scoped>
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 1rem 0;
  }

  table th,
  table td {
    padding: 0.75rem 1rem;
    text-align: left;
  }

  table th {
    font-weight: 600;
    font-size: 0.875rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  table td {
    font-size: 0.875rem;
  }

  table td:first-child {
    font-weight: 500;
  }

  .table-container {
    overflow-x: auto;
  }
</style>
