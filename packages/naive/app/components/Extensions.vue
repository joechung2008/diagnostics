<template>
  <nav class="extensions" aria-label="Extensions">
    <n-space vertical>
      <n-button v-for="link in links" :key="link.key" text @click="handleClick(link)">{{
        link.name
      }}</n-button>
    </n-space>
  </nav>
</template>

<script setup lang="ts">
import type { ExtensionsProps, KeyedNavLink } from "@/types/ExtensionsProps"
import { byKey, isExtensionInfo, toNavLink } from "~/utils/extensions"

const props = defineProps<ExtensionsProps>()

const links = computed(() =>
  Object.values(props.extensions ?? {})
    .filter(isExtensionInfo)
    .map(toNavLink)
    .sort(byKey)
)

function handleClick(link: KeyedNavLink) {
  props.onLinkClick?.(link)
}
</script>

<style scoped>
.extensions {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-height: max-content;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 0.5rem;
}
</style>
