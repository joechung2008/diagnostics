<template>
  <n-data-table :columns="columns" :data="rows" size="small" />
</template>

<script setup lang="ts">
import type { BuildInfoProps } from "@/types/BuildInfoProps"

const props = defineProps<BuildInfoProps>()

const columns = [
  { title: "Name", key: "name" },
  { title: "Value", key: "value" }
]

const rows = computed(() => [{ name: "Build Version", value: props.buildVersion }])
</script>
