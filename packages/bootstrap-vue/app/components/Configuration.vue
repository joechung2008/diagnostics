<template>
  <div>
    <h2>Configuration</h2>
    <BTable :items="rows" :fields="fields" small />
  </div>
</template>

<script setup lang="ts">
import type { ConfigurationProps } from "@/types/ConfigurationProps";

const props = defineProps<ConfigurationProps>();

const fields = [
  { key: "key", label: "Key" },
  { key: "value", label: "Value" }
];

const rows = computed(() =>
  Object.entries(props.config ?? {}).map(([key, value]) => ({ key, value }))
);
</script>
