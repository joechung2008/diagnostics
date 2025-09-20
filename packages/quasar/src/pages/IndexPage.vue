<template>
  <q-page class="flex column flexbox q-pa-md" :class="{ 'opacity-0': !mounted }">
    <div class="flex justify-between items-center">
      <q-select
        v-model="selectedEnvironment"
        aria-label="Select environment"
        option-label="text"
        :options="environmentOptions"
      />
      <div class="flex">
        <q-btn v-if="showPaasServerless" @click="selectPaas">paasserverless</q-btn>
        <q-btn class="q-ml-sm" @click="selectWebsites">websites</q-btn>
      </div>
    </div>

    <div v-if="pending" class="flex flex-center suspense">
      <q-spinner size="large" />
    </div>

    <div v-else-if="error" class="flex flex-center suspense">
      <q-banner class="bg-negative text-white">
        <template v-slot:avatar>
          <q-icon name="error" />
        </template>
        <h1>Error fetching diagnostics data</h1>
        <p>{{ error.message }}</p>
      </q-banner>
    </div>

    <template v-else>
      <q-tabs v-model="selectedTab" align="left">
        <q-tab name="extensions" label="Extensions" />
        <q-tab name="build" label="Build Information" />
        <q-tab name="server" label="Server Information" />
      </q-tabs>

      <div v-if="selectedTab === 'extensions' && diagnostics?.extensions" class="tab-panel">
        <div class="stack">
          <Extensions :extensions="diagnostics.extensions" @link-click="handleLinkClick" />
          <Extension
            v-if="extension && isExtensionInfo(extension)"
            v-bind="extension"
            class="grow"
          />
        </div>
      </div>

      <div v-if="selectedTab === 'build' && diagnostics?.buildInfo" class="tab-panel">
        <BuildInfo v-bind="diagnostics.buildInfo" />
      </div>
      <div v-if="selectedTab === 'server' && diagnostics?.serverInfo" class="tab-panel">
        <ServerInfo v-bind="diagnostics.serverInfo" />
      </div>
    </template>
  </q-page>
</template>

<script setup lang="ts">
import { computed, ref, watch, onMounted } from 'vue';
import { useFetch } from '../composables/useFetch';
import Extensions from '../components/Extensions.vue';
import Extension from '../components/Extension.vue';
import BuildInfo from '../components/BuildInfo.vue';
import ServerInfo from '../components/ServerInfo.vue';
import type { Diagnostics, Extension as ExtensionType, KeyedNavLink } from '../components/models';
import { isExtensionInfo } from '../utils/extensions';
import reportWebVitals from '../utils/reportWebVitals';
import { Environment, environmentOptions } from '../utils/environment';

const selectedEnvironment = ref(
  environmentOptions.find((opt) => opt.value === Environment.Public)!,
);
const selectedTab = ref<string>('extensions');
const extension = ref<ExtensionType | undefined>();
const mounted = ref(false);
const environmentUrl = computed(() => selectedEnvironment.value?.value || Environment.Public);

const {
  data: diagnosticsRef,
  pending,
  error,
  refresh,
} = useFetch<Diagnostics>(() => environmentUrl.value);

const diagnostics = computed(() => diagnosticsRef.value);

const showPaasServerless = computed(() =>
  isExtensionInfo(diagnostics.value?.extensions?.['paasserverless']),
);

function handleLinkClick(link?: KeyedNavLink) {
  if (link?.key) {
    const ext = diagnostics.value?.extensions?.[link.key];
    if (isExtensionInfo(ext)) {
      extension.value = ext;
    }
  }
}

function selectPaas() {
  const ext = diagnostics.value?.extensions?.['paasserverless'];
  if (isExtensionInfo(ext)) {
    extension.value = ext;
    selectedTab.value = 'extensions';
  }
}

function selectWebsites() {
  const ext = diagnostics.value?.extensions?.['websites'];
  if (isExtensionInfo(ext)) {
    extension.value = ext;
    selectedTab.value = 'extensions';
  }
}

watch(selectedEnvironment, async () => {
  extension.value = undefined;
  await refresh();
});

onMounted(async () => {
  mounted.value = true;
  await refresh();
  await reportWebVitals(console.log);
});
</script>

<style scoped>
.suspense {
  flex: 1;
  flex-wrap: nowrap;
  height: 100%;
  overflow: hidden;
}

.flexbox {
  height: 100vh;
}

.grow {
  flex-grow: 1;
}

.stack {
  display: flex;
  flex-direction: row;
  gap: 1rem;
  height: 100%;
}

.tab-panel {
  flex: 1;
  overflow-y: auto;
}
</style>
