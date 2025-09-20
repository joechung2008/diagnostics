<template>
  <div>
    <h2>Configuration</h2>
    <q-markup-table flat>
      <thead>
        <tr>
          <th class="text-left">Key</th>
          <th class="text-left">Value</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="[key, value] in configEntries" :key="key">
          <td>{{ key }}</td>
          <td>{{ value }}</td>
        </tr>
      </tbody>
    </q-markup-table>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { ConfigurationProps } from './models';

const props = defineProps<ConfigurationProps>();

const configEntries = computed(() => Object.entries(props.config ?? {}));
</script>
