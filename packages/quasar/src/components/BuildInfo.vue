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
        <tr v-for="row in rows" :key="row.name">
          <td>{{ row.name }}</td>
          <td>{{ row.value }}</td>
        </tr>
      </tbody>
    </q-markup-table>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { BuildInfoProps } from './models';

const props = defineProps<BuildInfoProps>();

const rows = computed(() => [{ name: 'Build Version', value: props.buildVersion }]);
</script>
