<template>
    <el-table :data="rows" style="width: 100%" aria-label="Build Info">
        <el-table-column prop="name" label="Name" show-overflow-tooltip />
        <el-table-column prop="value" label="Value" show-overflow-tooltip />
    </el-table>
</template>

<script setup lang="ts">
import type { BuildInfoProps } from "@/types"

const props = defineProps<BuildInfoProps>()

const rows = computed(() => [
    {
        name: "Build Version",
        value: props.buildVersion
    }
])
</script>
