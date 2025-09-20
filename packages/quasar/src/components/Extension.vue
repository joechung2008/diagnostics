<template>
  <div class="extension">
    <h1>{{ extensionName }}</h1>
    <Configuration v-if="config" :config="config" />
    <StageDefinition v-if="stageDefinition" :stage-definition="stageDefinition" />
  </div>
</template>

<script setup lang="ts">
import type { ExtensionProps } from './models';
import Configuration from './Configuration.vue';
import StageDefinition from './StageDefinition.vue';

defineProps<ExtensionProps>();
</script>

<style scoped>
.extension {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 1rem;
  overflow-y: auto;
}
</style>
