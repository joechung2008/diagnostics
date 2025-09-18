<script lang="ts">
  import Configuration from './Configuration.svelte'
  import StageDefinition from './StageDefinition.svelte'

  export let extensionName: string
  export let config: Record<string, string> | undefined = undefined
  export let stageDefinition: Record<string, string[]> | undefined = undefined
</script>

<div class="extension" role="tabpanel" tabindex={0}>
  <h1 class="title">{extensionName}</h1>
  <div class="content">
    {#if config}
      <Configuration {config} />
    {/if}
    {#if stageDefinition}
      <StageDefinition {stageDefinition} />
    {/if}
  </div>
</div>

<style scoped>
  .extension {
    display: flex;
    flex: 1;
    flex-direction: column;
    overflow-y: auto;
  }

  .title {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }

  .content {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
</style>
