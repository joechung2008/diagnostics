<script lang="ts" setup>
import type { BuildInfoProps } from './BuildInfoTable.types'

defineProps<BuildInfoProps>()
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
        <td>Build Version</td>
        <td>{{ buildVersion }}</td>
      </tr>
    </tbody>
  </v-table>
</template>
