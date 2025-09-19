<template>
  <div>
    <BTable :items="rows" :fields="fields" small />
  </div>
</template>

<script setup lang="ts">
import type { BuildInfoProps } from "@/types/BuildInfoProps";

const props = defineProps<BuildInfoProps>();

const fields = [
  { key: "name", label: "Name" },
  { key: "value", label: "Value" }
];

const rows = computed(() => [{ name: "Build Version", value: props.buildVersion }]);
</script>
