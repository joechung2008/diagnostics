<script lang="ts" setup>
import { computed } from 'vue'
import type { StageDefinitionProps } from './StageDefinitionTable.types'

const props = defineProps<StageDefinitionProps>()

const headers = [
  { title: 'Key', value: 'key' },
  { title: 'Value', value: 'value' },
]

const items = computed(() =>
  Object.entries(props.stageDefinition).map(([key, value]) => ({
    key,
    value: value.join(', '),
  }))
)
</script>

<template>
  <h2 class="text-h4">Stage Definitions</h2>
  <v-data-table :headers="headers" :items="items" hide-default-footer />
</template>
