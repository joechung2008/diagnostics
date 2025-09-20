<template>
  <div>
    <q-markup-table flat>
      <thead>
        <tr>
          <th class="text-left">Name</th>
          <th class="text-left">Value</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Hostname</td>
          <td>{{ props.hostname }}</td>
        </tr>
        <tr v-if="props.uptime !== undefined">
          <td>Uptime</td>
          <td>{{ props.uptime }}</td>
        </tr>
        <tr>
          <td>Server ID</td>
          <td>{{ props.serverId }}</td>
        </tr>
        <tr>
          <td>Deployment ID</td>
          <td>{{ props.deploymentId }}</td>
        </tr>
        <tr v-if="props.nodeVersions !== undefined">
          <td>Node Versions</td>
          <td>{{ props.nodeVersions }}</td>
        </tr>
        <tr>
          <td>Extension Sync | Total Sync All Count</td>
          <td>{{ props.extensionSync.totalSyncAllCount }}</td>
        </tr>
      </tbody>
    </q-markup-table>
  </div>
</template>

<script setup lang="ts">
import type { ServerInfoProps } from './models';

const props = defineProps<ServerInfoProps>();
</script>
