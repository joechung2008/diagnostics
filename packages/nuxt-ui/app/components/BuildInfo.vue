<template>
  <UTable :data="data" :columns="columns">
    <template #key-data="{ row }">
      <span class="text-sm">{{ row.original.key }}</span>
    </template>
    <template #value-data="{ row }">
      <span class="text-sm">{{ row.original.value }}</span>
    </template>
  </UTable>
</template>

<script setup lang="ts">
import type { TableColumn } from "@nuxt/ui";
import type { BuildInfoProps, KeyValuePair } from "~/types";

const props = defineProps<BuildInfoProps>();

const data = computed((): KeyValuePair<string>[] => [
  {
    key: "Build Version",
    value: props.buildVersion,
  },
]);

const columns: TableColumn<KeyValuePair<string>>[] = [
  {
    accessorKey: "key",
    accessorFn: (row) => row.key,
    header: "Name",
  },
  {
    accessorKey: "value",
    accessorFn: (row) => row.value,
    header: "Value",
  },
];
</script>
