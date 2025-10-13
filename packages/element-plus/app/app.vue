<template>
    <div class="flexbox">
        <el-row justify="space-between">
            <el-col :span="4">
                <el-select v-model="environment" class="environment">
                    <el-option v-for="(label, key) in environmentOptions" :key="key" :label="label" :value="key" />
                </el-select>
            </el-col>
            <el-row>
                <el-button v-if="showPaasServerless" @click="handlePassServerlessClick">
                    paasserverless
                </el-button>
                <el-button @click="handleWebsitesClick"> websites </el-button>
            </el-row>
        </el-row>

        <el-tabs v-model="selectedTab" class="tabs">
            <el-tab-pane label="Extensions" name="extensions" />
            <el-tab-pane label="Build" name="build" />
            <el-tab-pane label="Server" name="server" />
        </el-tabs>

        <div v-if="pending">Loading...</div>
        <div v-else-if="error">Error: {{ error.message }}</div>
        <template v-else>
            <div v-if="selectedTab === 'extensions' && diagnostics?.extensions" class="tab-panel">
                <div class="stack">
                    <Extensions :extensions="diagnostics.extensions" :on-link-click="handleLinkClick" />
                    <Extension v-if="selectedExtension" v-bind="selectedExtension" />
                </div>
            </div>

            <div v-if="selectedTab === 'build' && diagnostics?.buildInfo" class="tab-panel">
                <BuildInfo v-bind="diagnostics.buildInfo" />
            </div>

            <div v-if="selectedTab === 'server' && diagnostics?.serverInfo" class="tab-panel">
                <ServerInfo v-bind="diagnostics.serverInfo" />
            </div>
        </template>
    </div>
</template>

<script setup lang="ts">
import type { Diagnostics, ExtensionInfo, KeyedNavLink } from "@/types"
import { isExtensionInfo } from "@/utils/extensions"

import "element-plus/theme-chalk/dark/css-vars.css"

type Environment = (typeof Environment)[keyof typeof Environment]

const Environment = {
    Public: "https://hosting.portal.azure.net/api/diagnostics",
    Fairfax: "https://hosting.azureportal.usgovcloudapi.net/api/diagnostics",
    Mooncake: "https://hosting.azureportal.chinacloudapi.cn/api/diagnostics"
} as const

const environmentOptions = {
    [Environment.Public]: "Public Cloud",
    [Environment.Fairfax]: "Fairfax",
    [Environment.Mooncake]: "Mooncake"
}

const environment = ref<Environment>(Environment.Public)
const selectedTab = ref<string>("extensions")
const selectedExtension = ref<ExtensionInfo>()

watch(environment, () => {
    selectedTab.value = "extensions"
    selectedExtension.value = undefined
})

const { data, error, pending } = await useFetch<Diagnostics>(
    () => environment.value
)

const diagnostics = computed<Diagnostics | undefined>(() => data.value)

const showPaasServerless = computed(() =>
    isExtensionInfo(diagnostics.value?.extensions["paasserverless"])
)

function handleLinkClick(item?: KeyedNavLink) {
    if (item) {
        const ext = diagnostics.value?.extensions[item.key]
        if (isExtensionInfo(ext)) {
            selectedExtension.value = ext
        }
    }
}

function handlePassServerlessClick() {
    const ext = diagnostics.value?.extensions["paasserverless"]
    if (isExtensionInfo(ext)) {
        selectedExtension.value = ext
        selectedTab.value = "extensions"
    }
}

function handleWebsitesClick() {
    const ext = diagnostics.value?.extensions["websites"]
    if (isExtensionInfo(ext)) {
        selectedExtension.value = ext
        selectedTab.value = "extensions"
    }
}

reportWebVitals(console.log)
</script>

<style scoped>
#__nuxt {
    height: 100%;
}

.flexbox {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    height: 100vh;
    padding: 0.5rem 0.5rem 0;
}

.environment {
    width: 100%;
}

.stack {
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
    height: 100%;
}

.tab-panel {
    flex: 1;
    height: 100%;
    overflow-y: auto;
}
</style>
