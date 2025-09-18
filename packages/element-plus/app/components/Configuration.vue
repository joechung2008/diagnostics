<template>
    <h2 id="configuration">Configuration</h2>
    <el-table :data="rows" style="width: 100%" aria-labelledby="configuration">
        <el-table-column prop="key" label="Key" show-overflow-tooltip />
        <el-table-column prop="value" label="Value" show-overflow-tooltip />
    </el-table>
</template>

<script setup lang="ts">
import type { ConfigurationProps } from "@/types"

const props = defineProps<ConfigurationProps>()

const rows = computed(() =>
    Object.entries(props.config).map(([key, value]) => ({ key, value }))
)
</script>
