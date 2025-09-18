<script lang="ts" setup>
import type { ServerInfoProps } from './ServerInfoTable.types'

const { hostname, uptime, serverId, deploymentId, nodeVersions, extensionSync } =
  defineProps<ServerInfoProps>()
</script>

<template>
  <v-table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Value</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Hostname</td>
        <td>{{ hostname }}</td>
      </tr>
      <tr>
        <td>Uptime</td>
        <td>{{ uptime }}</td>
      </tr>
      <tr>
        <td>Server ID</td>
        <td>{{ serverId }}</td>
      </tr>
      <tr>
        <td>Deployment ID</td>
        <td>{{ deploymentId }}</td>
      </tr>
      <tr>
        <td>Node Versions</td>
        <td>{{ nodeVersions }}</td>
      </tr>
      <tr>
        <td>Extension Sync | Total Sync All Count</td>
        <td>{{ extensionSync.totalSyncAllCount }}</td>
      </tr>
    </tbody>
  </v-table>
</template>
