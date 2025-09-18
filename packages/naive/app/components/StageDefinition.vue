<template>
  <div>
    <n-h2>Stage Definitions</n-h2>
    <n-data-table :columns="columns" :data="rows" size="small" />
  </div>
</template>

<script setup lang="ts">
import type { StageDefinitionProps } from "@/types/StageDefinitionProps"

const props = defineProps<StageDefinitionProps>()

const columns = [
  { title: "Key", key: "key" },
  { title: "Value", key: "value" }
]

const rows = computed(() =>
  Object.entries(props.stageDefinition ?? {}).map(([key, value]) => ({
    key,
    value: (value || []).join(", ")
  }))
)
</script>
