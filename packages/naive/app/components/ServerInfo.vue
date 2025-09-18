<template>
  <n-data-table :columns="columns" :data="rows" size="small" />
</template>

<script setup lang="ts">
import type { ServerInfoProps } from "@/types/ServerInfoProps"
import { when } from "~/utils/extensions"

const props = defineProps<ServerInfoProps>()

const columns = [
  { title: "Name", key: "name" },
  { title: "Value", key: "value" }
]

const rows = computed(() => [
  { name: "Hostname", value: props.hostname },
  ...when(props.uptime !== undefined, {
    name: "Uptime",
    value: String(props.uptime)
  }),
  { name: "Server ID", value: props.serverId },
  { name: "Deployment ID", value: props.deploymentId },
  ...when(props.nodeVersions !== undefined, {
    name: "Node Versions",
    value: props.nodeVersions
  }),
  {
    name: "Extension Sync | Total Sync All Count",
    value: String(props.extensionSync.totalSyncAllCount)
  }
])
</script>
