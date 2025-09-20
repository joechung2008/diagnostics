<template>
  <div>
    <h2>Stage Definitions</h2>
    <q-markup-table flat>
      <thead>
        <tr>
          <th class="text-left">Key</th>
          <th class="text-left">Value</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="entry in stageEntries" :key="entry.key">
          <td>{{ entry.key }}</td>
          <td>{{ entry.value }}</td>
        </tr>
      </tbody>
    </q-markup-table>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { StageDefinitionProps } from './models';

const props = defineProps<StageDefinitionProps>();

const stageEntries = computed(() =>
  Object.entries(props.stageDefinition ?? {}).map(([key, value]) => ({
    key,
    value: value.join(', '),
  })),
);
</script>
