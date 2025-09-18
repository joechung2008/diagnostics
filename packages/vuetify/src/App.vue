<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { VIcon } from 'vuetify/components'
import type { Diagnostics } from './App.types'
import BuildInfoTable from './BuildInfoTable.vue'
import ExtensionItem from './ExtensionItem.vue'
import type { ExtensionInfo } from './ExtensionItems.types'
import ExtensionItems from './ExtensionItems.vue'
import ServerInfoTable from './ServerInfoTable.vue'
import { isExtensionInfo } from './utils'
import type { KeyedNavLink } from './types'

type Environment =
  | 'https://hosting.portal.azure.net/api/diagnostics'
  | 'https://hosting.azureportal.usgovcloudapi.net/api/diagnostics'
  | 'https://hosting.azureportal.chinacloudapi.cn/api/diagnostics'

const Environments = {
  Public: 'https://hosting.portal.azure.net/api/diagnostics' as Environment,
  Fairfax: 'https://hosting.azureportal.usgovcloudapi.net/api/diagnostics' as Environment,
  Mooncake: 'https://hosting.azureportal.chinacloudapi.cn/api/diagnostics' as Environment,
} as const

const diagnostics = ref<Diagnostics | undefined>(undefined)
const extension = ref<ExtensionInfo | undefined>(undefined)
const environment = ref<Environment>(Environments.Public)
const selectedTab = ref('extensions')
const menuOpen = ref(false)

const environmentName = computed(() => {
  switch (environment.value) {
    case Environments.Public:
      return 'Public Cloud'
    case Environments.Fairfax:
      return 'Fairfax'
    case Environments.Mooncake:
      return 'Mooncake'
    default:
      return 'Select environment'
  }
})

const showPaasServerless = computed(() =>
  isExtensionInfo(diagnostics.value?.extensions?.['paasserverless'])
)

const environments = [
  {
    key: 'public',
    text: 'Public Cloud',
    value: Environments.Public,
  },
  {
    key: 'fairfax',
    text: 'Fairfax',
    value: Environments.Fairfax,
  },
  {
    key: 'mooncake',
    text: 'Mooncake',
    value: Environments.Mooncake,
  },
]

const fetchDiagnostics = async () => {
  const response = await fetch(environment.value)
  diagnostics.value = await response.json()
}

watch(environment, () => {
  extension.value = undefined
  fetchDiagnostics()
})

onMounted(fetchDiagnostics)

const handleLinkClick = (_: KeyboardEvent | MouseEvent, link: KeyedNavLink) => {
  if (link) {
    const ext = diagnostics.value?.extensions?.[link.key]
    if (isExtensionInfo(ext)) {
      extension.value = ext
    }
  }
}

const selectExtension = (key: string) => {
  const ext = diagnostics.value?.extensions?.[key]
  if (isExtensionInfo(ext)) {
    extension.value = ext
  }
}
</script>

<template>
  <v-app class="flexbox">
    <v-toolbar>
      <v-menu v-model="menuOpen">
        <template #activator="{ props }">
          <v-btn v-bind="props" variant="text">
            {{ environmentName }}
            <v-icon>{{ menuOpen ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="env in environments"
            :key="env.key"
            @click="
              () => {
                environment = env.value
                extension = undefined
              }
            "
            :aria-checked="environment === env.value"
            role="menuitemradio"
          >
            {{ env.text }}
          </v-list-item>
        </v-list>
      </v-menu>
      <v-btn
        v-if="showPaasServerless"
        variant="text"
        @click="() => selectExtension('paasserverless')"
      >
        paasserverless
      </v-btn>
      <v-btn variant="text" @click="() => selectExtension('websites')"> websites </v-btn>
    </v-toolbar>
    <v-tabs v-model="selectedTab">
      <v-tab value="extensions">Extensions</v-tab>
      <v-tab value="build">Build Information</v-tab>
      <v-tab value="server">Server Information</v-tab>
    </v-tabs>
    <div class="tab-panel">
      <v-window v-model="selectedTab">
        <v-window-item value="extensions">
          <div class="stack">
            <div class="extensions">
              <ExtensionItems
                v-if="diagnostics?.extensions"
                :extensions="diagnostics.extensions"
                :onLinkClick="handleLinkClick"
              />
            </div>
            <div class="extension">
              <ExtensionItem v-if="extension" v-bind="extension" />
            </div>
          </div>
        </v-window-item>
        <v-window-item value="build">
          <BuildInfoTable v-if="diagnostics?.buildInfo" v-bind="diagnostics.buildInfo" />
        </v-window-item>
        <v-window-item value="server">
          <ServerInfoTable v-if="diagnostics?.serverInfo" v-bind="diagnostics.serverInfo" />
        </v-window-item>
      </v-window>
    </div>
  </v-app>
</template>

<style>
html,
body,
#app {
  height: 100%;
}

html,
body {
  margin: 0;
  padding: 0;
}
</style>

<style scoped>
:deep(.v-window),
:deep(.v-window-item) {
  height: 100%;
}

.extension,
.extensions {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-height: max-content;
  overflow-y: auto;
  padding: 0.25rem;
}

.extension {
  flex-grow: 1;
}

.flexbox {
  height: 100%;
}

.flexbox > ::deep(.v-application__wrap) {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.stack {
  display: flex;
  flex-direction: row;
  gap: 1rem;
  height: 100%;
}

.tab-panel {
  box-sizing: border-box;
  flex: 1;
  overflow-y: auto;
}
</style>
