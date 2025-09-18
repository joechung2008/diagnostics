<template>
  <div class="extension-root flex-grow">
    <h2 class="text-2xl font-semibold">{{ extensionName }}</h2>
    <ConfigurationInfo v-if="config" :config="config" />
    <StageDefinition
      v-if="stageDefinition"
      :stage-definition="stageDefinition"
    />
  </div>
</template>

<script setup lang="ts">
import type { ExtensionInfo } from "~/types";
import ConfigurationInfo from "./ConfigurationInfo.vue";
import StageDefinition from "./StageDefinition.vue";

defineProps<ExtensionInfo>();
</script>
