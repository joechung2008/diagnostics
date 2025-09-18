<template>
  <div>
    <n-h2>Configuration</n-h2>
    <n-data-table :columns="columns" :data="rows" size="small" />
  </div>
</template>

<script setup lang="ts">
import type { ConfigurationProps } from "@/types/ConfigurationProps"

const props = defineProps<ConfigurationProps>()

const columns = [
  { title: "Key", key: "key" },
  { title: "Value", key: "value" }
]

const rows = computed(() =>
  Object.entries(props.config ?? {}).map(([key, value]) => ({ key, value }))
)
</script>
