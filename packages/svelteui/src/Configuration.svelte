<script lang="ts">
  export let config: Record<string, string>

  $: items = Object.entries(config).map(([key, value]) => ({
    key,
    value
  }))
</script>

<div>
  <h2 id="configuration">Configuration</h2>
  <div class="table-container">
    <table aria-labelledby="configuration">
      <thead>
        <tr>
          <th>Key</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        {#each items as item (item.key)}
          <tr>
            <td>{item.key}</td>
            <td>{item.value}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>

<style scoped>
  h2 {
    font-size: 1.125rem;
    font-weight: 600;
  }

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
