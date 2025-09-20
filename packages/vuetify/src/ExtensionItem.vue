<script setup lang="ts">
import ConfigurationTable from './ConfigurationTable.vue'
import type { ExtensionInfo } from './ExtensionItems.types'
import StageDefinitionTable from './StageDefinitionTable.vue'

defineProps<ExtensionInfo>()
</script>

<template>
  <v-badge v-if="managedSdpEnabled" color="primary" content="SDP Enabled" inline>
    <h1 class="text-h3">
      {{ extensionName }}
    </h1>
  </v-badge>
  <h1 v-else class="text-h3">
    {{ extensionName }}
  </h1>
  <ConfigurationTable v-if="config" :config="config" />
  <StageDefinitionTable v-if="stageDefinition" :stageDefinition="stageDefinition" />
</template>
