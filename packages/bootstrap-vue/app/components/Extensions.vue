<template>
  <nav class="extensions" aria-label="Extensions">
    <div class="d-flex flex-column gap-3">
      <BLink
        v-for="link in links"
        :key="link.key"
        href="#"
        class="text-start"
        @click="handleClick(link)"
      >
        {{ link.name }}
      </BLink>
    </div>
  </nav>
</template>

<script setup lang="ts">
import type { ExtensionsProps, KeyedNavLink } from "@/types/ExtensionsProps";
import { byKey, isExtensionInfo, toNavLink } from "@/utils/extensions";

const props = defineProps<ExtensionsProps>();

const links = computed(() =>
  Object.values(props.extensions ?? {})
    .filter(isExtensionInfo)
    .map(toNavLink)
    .sort(byKey)
);

function handleClick(link: KeyedNavLink) {
  props.onLinkClick?.(link);
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
