<template>
  <div>
    <h2>Stage Definitions</h2>
    <q-table :rows="rows" :columns="columns" flat />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { StageDefinitionProps } from './models';

const props = defineProps<StageDefinitionProps>();

const columns = [
  { name: 'key', label: 'Key', field: 'key', align: 'left' as const },
  { name: 'value', label: 'Value', field: 'value', align: 'left' as const },
];

const rows = computed(() =>
  Object.entries(props.stageDefinition ?? {}).map(([key, value]) => ({
    key,
    value: value.join(', '),
  })),
);
</script>
