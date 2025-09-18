<script lang="ts">
  import { Button } from '@svelteuidev/core'
  import { createEventDispatcher } from 'svelte'
  import type {
    Extension,
    ExtensionInfo,
    ExtensionsProps,
    KeyedNavLink
  } from './types'

  export let extensions: ExtensionsProps['extensions']
  export let onLinkClick: ExtensionsProps['onLinkClick'] | undefined

  const dispatch = createEventDispatcher<{
    linkClick: { event: Event; link: KeyedNavLink }
  }>()

  // Utility functions
  function isExtensionInfo(extension: Extension): extension is ExtensionInfo {
    return 'extensionName' in extension
  }

  function toNavLink(extension: ExtensionInfo): KeyedNavLink {
    return {
      key: extension.extensionName,
      name: extension.extensionName,
      url: extension.extensionName
    }
  }

  function byKey(a: KeyedNavLink, b: KeyedNavLink): number {
    return a.key.localeCompare(b.key)
  }

  $: links = Object.values(extensions)
    .filter(isExtensionInfo)
    .map(toNavLink)
    .sort(byKey)

  function handleClick(event: CustomEvent<unknown>, link: KeyedNavLink) {
    onLinkClick?.(event, link)
    dispatch('linkClick', { event, link })
  }
</script>

<nav aria-label="Extensions">
  {#each links as link (link.key)}
    <Button
      class="extension-link"
      variant="subtle"
      on:click={(event) => handleClick(event, link)}
    >
      {link.name}
    </Button>
  {/each}
</nav>

<style scoped>
  nav {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    overflow: hidden auto;
  }
</style>
