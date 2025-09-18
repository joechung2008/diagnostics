<script lang="ts" setup>
import { computed } from 'vue'
import type { ConfigurationProps } from './ConfigurationTable.types'

const props = defineProps<ConfigurationProps>()

const headers = [
  { title: 'Key', value: 'key' },
  { title: 'Value', value: 'value' },
]

const items = computed(() => Object.entries(props.config).map(([key, value]) => ({ key, value })))
</script>

<template>
  <h2 class="text-h4">Configuration</h2>
  <v-data-table :headers="headers" :items="items" hide-default-footer />
</template>
