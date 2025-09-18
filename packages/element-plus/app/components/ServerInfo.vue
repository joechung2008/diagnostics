<template>
    <el-table :data="rows" style="width: 100%" aria-label="Server Info">
        <el-table-column prop="name" label="Name" show-overflow-tooltip />
        <el-table-column prop="value" label="Value" show-overflow-tooltip />
    </el-table>
</template>

<script setup lang="ts">
import type { ServerInfoProps } from "@/types"

const props = defineProps<ServerInfoProps>()

const rows = computed(() => [
    { name: "Hostname", value: props.hostname },
    { name: "Uptime", value: props.uptime },
    { name: "Server ID", value: props.serverId },
    { name: "Deployment ID", value: props.deploymentId },
    { name: "Node Versions", value: props.nodeVersions },
    {
        name: "Extension Sync | Total Sync All Count",
        value: props.extensionSync.totalSyncAllCount
    }
])
</script>
