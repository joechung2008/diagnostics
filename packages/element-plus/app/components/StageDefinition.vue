<template>
    <h2 id="stage-definitions">Stage Definitions</h2>
    <el-table :data="rows" style="width: 100%" aria-labelledby="stage-definitions">
        <el-table-column prop="key" label="Key" show-overflow-tooltip />
        <el-table-column prop="value" label="Value" show-overflow-tooltip />
    </el-table>
</template>

<script setup lang="ts">
import type { StageDefinitionProps } from "@/types"

const props = defineProps<StageDefinitionProps>()

const rows = computed(() =>
    Object.entries(props.stageDefinition).map(([key, value]) => ({
        key,
        value: value.join(", ")
    }))
)
</script>
