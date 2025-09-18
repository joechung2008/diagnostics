<script lang="ts" setup>
import { computed } from 'vue'
import type { ExtensionsProps } from './ExtensionItems.types'
import { byKey, isExtensionInfo, toNavLink } from './utils'

const props = defineProps<ExtensionsProps>()

const links = computed(() =>
  Object.values(props.extensions).filter(isExtensionInfo).map(toNavLink).sort(byKey)
)
</script>

<template>
  <v-list aria-label="Extensions" role="navigation" tag="nav">
    <v-list-item v-for="link in links" :key="link.key">
      <v-btn
        block
        class="justify-start"
        @click="(e: KeyboardEvent | MouseEvent) => props.onLinkClick?.(e, link)"
      >
        {{ link.name }}
      </v-btn>
    </v-list-item>
  </v-list>
</template>
