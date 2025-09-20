<template>
  <div>
    <h2>Configuration</h2>
    <q-table :rows="rows" :columns="columns" flat />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { ConfigurationProps } from './models';

const props = defineProps<ConfigurationProps>();

const columns = [
  { name: 'key', label: 'Key', field: 'key', align: 'left' as const },
  { name: 'value', label: 'Value', field: 'value', align: 'left' as const },
];

const rows = computed(() =>
  Object.entries(props.config ?? {}).map(([key, value]) => ({ key, value })),
);
</script>
