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
import type { ServerInfoProps } from "~/types";
import { when } from "~/utils/extensions";

const props = defineProps<ServerInfoProps>();

type ServerData = {
  key: string;
  value: string | number | undefined;
};

const data = computed((): ServerData[] => [
  {
    key: "Hostname",
    value: props.hostname,
  },
  ...when(props.uptime, {
    key: "Uptime",
    value: props.uptime,
  }),
  {
    key: "Server ID",
    value: props.serverId,
  },
  {
    key: "Deployment ID",
    value: props.deploymentId,
  },
  ...when(props.nodeVersions, {
    key: "Node Versions",
    value: props.nodeVersions,
  }),
  {
    key: "Extension Sync | Total Sync All Count",
    value: props.extensionSync.totalSyncAllCount,
  },
]);

const columns: TableColumn<ServerData>[] = [
  {
    id: "key",
    accessorKey: "key",
    accessorFn: (row) => row.key,
    header: "Name",
  },
  {
    id: "value",
    accessorKey: "value",
    accessorFn: (row) => row.value,
    header: "Value",
  },
];
</script>
