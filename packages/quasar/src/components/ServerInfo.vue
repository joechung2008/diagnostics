<template>
  <div>
    <q-table :rows="rows" :columns="columns" flat />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { ServerInfoProps } from './models';
import { when } from '../utils/extensions';

const props = defineProps<ServerInfoProps>();

const columns = [
  { name: 'name', label: 'Name', field: 'name', align: 'left' as const },
  { name: 'value', label: 'Value', field: 'value', align: 'left' as const },
];

const rows = computed(() => [
  { name: 'Hostname', value: props.hostname },
  ...when(props.uptime !== undefined, {
    name: 'Uptime',
    value: String(props.uptime),
  }),
  { name: 'Server ID', value: props.serverId },
  { name: 'Deployment ID', value: props.deploymentId },
  ...when(props.nodeVersions !== undefined, {
    name: 'Node Versions',
    value: props.nodeVersions,
  }),
  {
    name: 'Extension Sync | Total Sync All Count',
    value: String(props.extensionSync.totalSyncAllCount),
  },
]);
</script>
