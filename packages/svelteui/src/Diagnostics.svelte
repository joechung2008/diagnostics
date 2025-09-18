<script lang="ts">
  import { Button, Menu, Tabs } from '@svelteuidev/core'
  import { createQuery } from '@tanstack/svelte-query'
  import { ChevronDown } from 'lucide-svelte'
  import { onMount } from 'svelte'
  import BuildInfo from './BuildInfo.svelte'
  import {
    Environment,
    getEnvironmentName,
    type EnvironmentType
  } from './environment'
  import Extension from './Extension.svelte'
  import Extensions from './Extensions.svelte'
  import ServerInfo from './ServerInfo.svelte'
  import type { Diagnostics, ExtensionInfo } from './types'
  import { isExtensionInfo } from './utils'

  // Component state
  let selectedEnvironment: EnvironmentType = Environment.Public
  let selectedExtension: ExtensionInfo | null = null
  let selectedIndex = 0

  // Query for fetching diagnostics for the selected environment
  const query = createQuery<Diagnostics, Error>({
    queryKey: ['diagnostics'],
    queryFn: async () => {
      const response = await fetch(selectedEnvironment)
      if (!response.ok) {
        throw new Error(`Failed to fetch diagnostics: ${response.statusText}`)
      }
      return response.json()
    },
    enabled: !import.meta.env.SSR
  })

  onMount(() => {
    $query.refetch()
  })

  // Reactive aliases used in template
  $: diagnostics = $query.data
  $: errorMessage = $query.error?.message
  $: loading = $query.isLoading

  // Reactive statements
  $: environmentName = getEnvironmentName(selectedEnvironment)
  $: showPaasServerless =
    diagnostics?.extensions?.paasserverless &&
    isExtensionInfo(diagnostics.extensions.paasserverless)

  // Event handlers
  function handleEnvironmentChange(newEnvironment: EnvironmentType) {
    selectedEnvironment = newEnvironment
    selectedExtension = null
    $query.refetch()
  }

  function handleExtensionButtonClick(extensionKey: string) {
    if (diagnostics?.extensions) {
      const extension = diagnostics.extensions[extensionKey]
      if (isExtensionInfo(extension)) {
        selectedExtension = extension
      }
    }
  }
</script>

<div class="flexbox">
  <!-- Toolbar -->
  <div class="toolbar">
    <!-- Environment Selector -->
    <Menu menuButtonLabel="Select environment">
      <Button class="menu-trigger" slot="control" variant="default">
        <span class="menu-text">{environmentName}</span>
        <span class="chevron-wrapper">
          <ChevronDown class="chevron" size={16} />
        </span>
      </Button>

      {#each Object.entries(Environment) as [key, value] (key)}
        <Menu.Item on:click={() => handleEnvironmentChange(value)}>
          {getEnvironmentName(value)}
        </Menu.Item>
      {/each}
    </Menu>

    <!-- Extension Buttons -->
    {#if showPaasServerless}
      <Button
        variant="default"
        on:click={() => handleExtensionButtonClick('paasserverless')}
      >
        paasserverless
      </Button>
    {/if}

    <Button
      variant="default"
      on:click={() => handleExtensionButtonClick('websites')}
    >
      websites
    </Button>
  </div>

  <!-- Tabs -->
  <Tabs
    active={selectedIndex}
    on:change={(e) => {
      selectedIndex = e.detail.index
    }}
  >
    <Tabs.Tab aria-controls="extensions-tab" label="Extensions" />
    <Tabs.Tab aria-controls="build-tab" label="Build Information" />
    <Tabs.Tab aria-controls="server-tab" label="Server Information" />
  </Tabs>

  <!-- Tab Content -->
  {#if loading}
    <div class="loading">Loading diagnostics...</div>
  {:else if errorMessage}
    <div class="error">Error: {errorMessage}</div>
  {:else if diagnostics}
    {#if selectedIndex === 0 && diagnostics.extensions}
      <div id="extensions-tab" class="tab-panel" role="tabpanel">
        <div class="stack">
          <Extensions
            extensions={diagnostics.extensions}
            onLinkClick={(_, link) => {
              if (link) {
                const extension = diagnostics.extensions[link.key]
                if (isExtensionInfo(extension)) {
                  selectedExtension = extension
                }
              }
            }}
          />
          {#if selectedExtension}
            <Extension
              extensionName={selectedExtension.extensionName}
              config={selectedExtension.config}
              stageDefinition={selectedExtension.stageDefinition}
            />
          {/if}
        </div>
      </div>
    {/if}

    {#if selectedIndex === 1 && diagnostics.buildInfo}
      <div id="build-tab" class="tab-panel" role="tabpanel">
        <BuildInfo {...diagnostics.buildInfo} />
      </div>
    {/if}

    {#if selectedIndex === 2 && diagnostics.serverInfo}
      <div id="server-tab" class="tab-panel" role="tabpanel">
        <ServerInfo {...diagnostics.serverInfo} />
      </div>
    {/if}
  {/if}
</div>

<style scoped>
  .toolbar {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .loading {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 200px;
    font-size: 1.125rem;
    color: #6b7280;
  }

  .error {
    padding: 1rem;
    background-color: #fef2f2;
    border: 1px solid #fecaca;
    border-radius: 0.375rem;
    color: #dc2626;
    margin: 1rem;
  }

  .flexbox {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    height: 100vh;
    padding: 0.5rem;
  }

  .stack {
    display: flex;
    flex-direction: row;
    gap: 1rem;
    height: 100%;
  }

  .tab-panel {
    box-sizing: border-box;
    flex: 1;
    overflow-y: auto;
  }

  .menu-text {
    margin-right: 8px;
  }

  .chevron-wrapper {
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
</style>
