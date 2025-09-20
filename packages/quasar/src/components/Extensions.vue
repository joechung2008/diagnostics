<template>
  <nav class="flex column extensions">
    <q-list aria-label="Extensions">
      <q-item v-for="link in links" :key="link.key" clickable @click="handleClick(link)">
        <q-item-section>
          {{ link.name }}
        </q-item-section>
      </q-item>
    </q-list>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { ExtensionsProps, KeyedNavLink } from './models';
import { byKey, isExtensionInfo, toNavLink } from '../utils/extensions';

const props = defineProps<ExtensionsProps>();

const links = computed(() =>
  Object.values(props.extensions ?? {})
    .filter(isExtensionInfo)
    .map(toNavLink)
    .sort(byKey),
);

function handleClick(link: KeyedNavLink) {
  props.onLinkClick?.(link);
}
</script>

<style scoped>
.extensions {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow-x: hidden;
  overflow-y: auto;
}
</style>
