<template>
  <n-config-provider :theme="theme">
    <n-global-style />
    <div class="flexbox" :class="{ 'opacity-0': !mounted }">
      <n-space align="center" justify="space-between">
        <n-select
          v-model:value="selectedEnvironment"
          :options="environmentOptions"
          class="environment"
          size="medium"
        />
        <n-space>
          <n-button v-if="showPaasServerless" @click="selectPaas">paasserverless</n-button>
          <n-button @click="selectWebsites">websites</n-button>
        </n-space>
      </n-space>

      <n-tabs v-model:value="selectedTab" class="tab-list" type="line">
        <n-tab-pane name="extensions" tab="Extensions" />
        <n-tab-pane name="build" tab="Build Information" />
        <n-tab-pane name="server" tab="Server Information" />
      </n-tabs>

      <div v-if="pending" class="tab-panel centered">
        <n-spin size="large" />
      </div>

      <div v-else-if="error" class="tab-panel centered">
        <n-alert type="error" title="Error fetching diagnostics data" :closable="false">
          <p>{{ error.message }}</p>
        </n-alert>
      </div>

      <div v-else-if="selectedTab === 'extensions' && diagnostics?.extensions" class="tab-panel">
        <div class="stack">
          <Extensions :extensions="diagnostics.extensions" @link-click="handleLinkClick" />
          <Extension v-if="extension && isExtensionInfo(extension)" v-bind="extension" />
        </div>
      </div>

      <div v-else-if="selectedTab === 'build' && diagnostics?.buildInfo" class="tab-panel">
        <BuildInfo v-bind="diagnostics.buildInfo" />
      </div>

      <div v-else-if="selectedTab === 'server' && diagnostics?.serverInfo" class="tab-panel">
        <ServerInfo v-bind="diagnostics.serverInfo" />
      </div>
    </div>
  </n-config-provider>
</template>

<script setup lang="ts">
import type { Diagnostics } from "@/types/Diagnostics"
import type { Extension as ExtensionType } from "@/types/Extension"
import type { KeyedNavLink } from "@/types/ExtensionsProps"
import { darkTheme, NConfigProvider } from "naive-ui"
import { isExtensionInfo } from "~/utils/extensions"
import reportWebVitals from "~/utils/reportWebVitals"

import "vfonts/Lato.css"
import "vfonts/FiraCode.css"

const Environment = {
  Public: "https://hosting.portal.azure.net/api/diagnostics",
  Fairfax: "https://hosting.azureportal.usgovcloudapi.net/api/diagnostics",
  Mooncake: "https://hosting.azureportal.chinacloudapi.cn/api/diagnostics"
} as const

function getEnvironmentName(env?: string) {
  switch (env) {
    case Environment.Public:
      return "Public Cloud"
    case Environment.Fairfax:
      return "Fairfax"
    case Environment.Mooncake:
      return "Mooncake"
    default:
      return "Select environment"
  }
}

const theme = ref(darkTheme)
const selectedEnvironment = ref<string>(Environment.Public)
const selectedTab = ref<string>("extensions")
const extension = ref<ExtensionType | undefined>()
const mounted = ref(false)

const {
  data: diagnosticsRef,
  pending,
  error,
  refresh
} = useFetch<Diagnostics>(() => selectedEnvironment.value, {
  key: () => `diagnostics:${selectedEnvironment.value}`
})

const diagnostics = computed(() => diagnosticsRef.value)

const environmentOptions = computed(() =>
  Object.values(Environment).map((url) => ({
    label: getEnvironmentName(url),
    value: url
  }))
)

const showPaasServerless = computed(() =>
  isExtensionInfo(diagnostics.value?.extensions?.["paasserverless"])
)

function handleLinkClick(link?: KeyedNavLink) {
  if (link?.key) {
    const ext = diagnostics.value?.extensions?.[link.key]
    if (isExtensionInfo(ext)) {
      extension.value = ext
    }
  }
}

function selectPaas() {
  const ext = diagnostics.value?.extensions?.["paasserverless"]
  if (isExtensionInfo(ext)) {
    extension.value = ext
    selectedTab.value = "extensions"
  }
}

function selectWebsites() {
  const ext = diagnostics.value?.extensions?.["websites"]
  if (isExtensionInfo(ext)) {
    extension.value = ext
    selectedTab.value = "extensions"
  }
}

watch(selectedEnvironment, () => {
  extension.value = undefined
  refresh()
})

onMounted(() => {
  mounted.value = true

  reportWebVitals(console.log)
})
</script>

<script lang="ts">
// Explicitly register NConfigProvider so the <n-config-provider> tag
// resolves during VTU mounts. We don't register other Naive UI components
// here because they are auto-imported in the Nuxt build (unplugin-components)
// and do not require an explicit registration for most test scenarios.
export default {
  components: {
    NConfigProvider
  }
}
</script>

<style scoped>
#__nuxt {
  height: 100%;
}

.flexbox {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  height: 100vh;
  padding: 0.5rem;
}

.centered {
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
}

.environment {
  width: 10rem;
}

.stack {
  display: flex;
  flex-direction: row;
  gap: 1rem;
  height: 100%;
}

.tab-list {
  padding: 0 0.5rem;
}

.tab-panel {
  flex: 1;
  height: 100%;
  overflow-y: auto;
}
</style>
