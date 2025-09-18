<template>
    <nav class="extensions" aria-label="Extensions">
        <el-button v-for="link in links" :key="link.key" class="extension" @click="handleLinkClick(link)">
            {{ link.name }}
        </el-button>
    </nav>
</template>

<script setup lang="ts">
import type { ExtensionsProps, KeyedNavLink } from "@/types"
import { byKey, isExtensionInfo, toNavLink } from "../utils/extensions"

const props = defineProps<ExtensionsProps>()

const links = computed(() =>
    Object.values(props.extensions)
        .filter(isExtensionInfo)
        .map(toNavLink)
        .sort(byKey)
)

function handleLinkClick(link: KeyedNavLink) {
    props.onLinkClick(link)
}
</script>

<style scoped>
.extensions {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    height: 100%;
    overflow-y: auto;
    padding-right: 0.5rem;
}

/* Override Element Plus default margin */
.extension {
    justify-content: start;
    margin: 0;
}
</style>
