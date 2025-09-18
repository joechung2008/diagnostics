<template>
  <div class="extension-root">
    <UNavigationMenu orientation="vertical" :items="navItems" />
  </div>
</template>

<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";
import type { ExtensionsProps, KeyedNavLink } from "~/types";
import { byKey, isExtensionInfo, toNavLink } from "~/utils/extensions";

const props = defineProps<ExtensionsProps>();

const links = computed(() => {
  return Object.values(props.extensions)
    .filter(isExtensionInfo)
    .map(toNavLink)
    .sort(byKey);
});

const navItems = computed<NavigationMenuItem[]>(() => {
  return links.value.map((link: KeyedNavLink) => ({
    label: link.name,
    onSelect: (e: MouseEvent) => {
      e.preventDefault();
      props.onLinkClick(e, link);
    },
  }));
});
</script>
