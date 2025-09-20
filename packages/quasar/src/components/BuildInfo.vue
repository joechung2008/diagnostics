<template>
  <div>
    <q-table :rows="rows" :columns="columns" flat />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { BuildInfoProps } from './models';

const props = defineProps<BuildInfoProps>();

const columns = [
  { name: 'name', label: 'Name', field: 'name', align: 'left' as const },
  { name: 'value', label: 'Value', field: 'value', align: 'left' as const },
];

const rows = computed(() => [{ name: 'Build Version', value: props.buildVersion }]);
</script>
