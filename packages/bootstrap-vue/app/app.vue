<template>
  <BApp>
    <div class="d-flex flex-column vh-100 p-2" :class="{ 'opacity-0': !mounted }">
      <div class="d-flex justify-content-between align-items-center mb-2">
        <BFormSelect
          v-model="selectedEnvironment"
          :options="environmentOptions"
          class="w-auto"
          aria-label="Select environment"
        />
        <div class="d-flex gap-2">
          <BButton v-if="showPaasServerless" size="sm" @click="selectPaas">paasserverless</BButton>
          <BButton size="sm" @click="selectWebsites">websites</BButton>
        </div>
      </div>

      <div v-if="pending" class="d-flex justify-content-center align-items-center h-100">
        <BSpinner size="large" />
      </div>

      <div v-else-if="error" class="d-flex justify-content-center align-items-center h-100">
        <BAlert variant="danger" show>
          <h4 class="alert-heading">Error fetching diagnostics data</h4>
          <p>{{ error.message }}</p>
        </BAlert>
      </div>

      <template v-else>
        <BTabs v-model="selectedTab" class="pb-2">
          <BTab id="extensions" title="Extensions" aria-controls="extensions-tab" />
          <BTab id="build" title="Build Information" aria-controls="build-tab" />
          <BTab id="server" title="Server Information" aria-controls="server-tab" />
        </BTabs>

        <div
          v-if="selectedTab === 'extensions' && diagnostics?.extensions"
          id="extensions-tab"
          class="flex-fill overflow-y-auto"
        >
          <div class="d-flex flex-row gap-4 h-100">
            <Extensions :extensions="diagnostics.extensions" @link-click="handleLinkClick" />
            <Extension
              v-if="extension && isExtensionInfo(extension)"
              v-bind="extension"
              class="flex-grow-1"
            />
          </div>
        </div>

        <div
          v-if="selectedTab === 'build' && diagnostics?.buildInfo"
          id="build-tab"
          class="flex-fill overflow-y-auto"
        >
          <BuildInfo v-bind="diagnostics.buildInfo" />
        </div>
        <div
          v-if="selectedTab === 'server' && diagnostics?.serverInfo"
          id="server-tab"
          class="flex-fill overflow-y-auto"
        >
          <ServerInfo v-bind="diagnostics.serverInfo" />
        </div>
      </template>
    </div>
  </BApp>
</template>

<script setup lang="ts">
import type { Diagnostics } from "@/types/Diagnostics";
import type { Extension as ExtensionType } from "@/types/Extension";
import type { KeyedNavLink } from "@/types/ExtensionsProps";
import { isExtensionInfo } from "@/utils/extensions";
import reportWebVitals from "@/utils/reportWebVitals";
import { useColorMode } from "bootstrap-vue-next";
import { Environment, environmentOptions } from "./utils/environment";

import "bootstrap-vue-next/dist/bootstrap-vue-next.css";
import "bootstrap/dist/css/bootstrap.css";

const selectedEnvironment = ref<string>(Environment.Public);
const selectedTab = ref<string>("extensions");
const extension = ref<ExtensionType | undefined>();
const mounted = ref(false);

const mode = useColorMode({ initialValue: "auto" });

useHead({
  htmlAttrs: {
    "data-bs-theme": mode
  }
});

const {
  data: diagnosticsRef,
  pending,
  error,
  refresh
} = useFetch<Diagnostics>(() => selectedEnvironment.value, {
  key: () => `diagnostics:${selectedEnvironment.value}`
});

const diagnostics = computed(() => diagnosticsRef.value);

const showPaasServerless = computed(() =>
  isExtensionInfo(diagnostics.value?.extensions?.["paasserverless"])
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
  const ext = diagnostics.value?.extensions?.["paasserverless"];
  if (isExtensionInfo(ext)) {
    extension.value = ext;
    selectedTab.value = "extensions";
  }
}

function selectWebsites() {
  const ext = diagnostics.value?.extensions?.["websites"];
  if (isExtensionInfo(ext)) {
    extension.value = ext;
    selectedTab.value = "extensions";
  }
}

watch(selectedEnvironment, () => {
  extension.value = undefined;
  refresh();
});

onMounted(() => {
  mounted.value = true;

  reportWebVitals(console.log);
});
</script>
