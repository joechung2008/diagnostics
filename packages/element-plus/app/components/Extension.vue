<template>
    <div class="extension">
        <h1>{{ extensionName }}</h1>
        <Configuration v-if="config" :config="config" />
        <StageDefinition v-if="stageDefinition" :stage-definition="stageDefinition" />
    </div>
</template>

<script setup lang="ts">
import type { ExtensionProps } from "@/types"

defineProps<ExtensionProps>()
</script>

<style scoped>
.extension {
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: 0.5rem;
    max-height: max-content;
    overflow-y: auto;
    padding: 0.25rem;
}

h1 {
    margin: 0;
}
</style>
