<template>
  <div>
    <h2>Stage Definitions</h2>
    <BTable :items="rows" :fields="fields" small />
  </div>
</template>

<script setup lang="ts">
import type { StageDefinitionProps } from "@/types/StageDefinitionProps";

const props = defineProps<StageDefinitionProps>();

const fields = [
  { key: "key", label: "Key" },
  { key: "value", label: "Value" }
];

const rows = computed(() =>
  Object.entries(props.stageDefinition ?? {}).map(([key, value]) => ({
    key,
    value: value.join(", ")
  }))
);
</script>
