<template>
  <h3 class="text-lg font-semibold mb-4">Stage Definitions</h3>
  <UTable :data="data" :columns="columns">
    <template #key-data="{ row }">
      <span class="font-mono text-sm">{{ row.original.key }}</span>
    </template>
    <template #value-data="{ row }">
      <span class="text-sm">{{ row.original.value }}</span>
    </template>
  </UTable>
</template>

<script setup lang="ts">
import type { TableColumn } from "@nuxt/ui";
import type { KeyValuePair, StageDefinitionProps } from "~/types";

const props = defineProps<StageDefinitionProps>();

const data = computed(() => {
  return Object.entries(props.stageDefinition).map(([key, value]) => ({
    key,
    value: value.join(", "),
  }));
});

const columns: TableColumn<KeyValuePair<string>>[] = [
  {
    accessorKey: "key",
    accessorFn: (row) => row.key,
    header: "Key",
  },
  {
    accessorKey: "value",
    accessorFn: (row) => row.value,
    header: "Value",
  },
];
</script>
