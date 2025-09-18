<template>
  <div
    class="flex flex-col h-screen transition-opacity"
    :class="{ 'opacity-0': !mounted }"
  >
    <UButtonGroup class="p-1">
      <UDropdownMenu :items="environments" mode="click">
        <UButton color="neutral" icon="i-lucide-chevron-down" variant="outline">
          {{ environmentName }}
        </UButton>
      </UDropdownMenu>
      <UButton
        v-if="showPaasServerless"
        @click="selectExtension('paasserverless')"
      >
        paasserverless
      </UButton>
      <UButton @click="selectExtension('websites')">websites</UButton>
    </UButtonGroup>

    <UTabs v-model="selectedTab" :items="tabs" justify="start" variant="link" />

    <div v-if="selectedTab === 'extensions'" class="tab-panel">
      <div class="stack">
        <ExtensionItems
          v-if="diagnostics?.extensions"
          :extensions="diagnostics?.extensions"
          :on-link-click="handleLinkClick"
        />
        <ExtensionItem v-if="selectedExtension" v-bind="selectedExtension" />
      </div>
    </div>

    <div v-if="selectedTab === 'build'" class="tab-panel">
      <BuildInfo
        v-if="diagnostics?.buildInfo"
        v-bind="diagnostics?.buildInfo"
      />
    </div>

    <div v-if="selectedTab === 'server'" class="tab-panel">
      <ServerInfo
        v-if="diagnostics?.serverInfo"
        v-bind="diagnostics?.serverInfo"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { isExtensionInfo } from "~/utils/extensions";
import type { Diagnostics, ExtensionInfo, KeyedNavLink } from "~/types";
import type { DropdownMenuItem, TabsItem } from "@nuxt/ui";

type Environment =
  | "https://hosting.portal.azure.net/api/diagnostics"
  | "https://hosting.azureportal.usgovcloudapi.net/api/diagnostics"
  | "https://hosting.azureportal.chinacloudapi.cn/api/diagnostics";

const Environments = {
  Public: "https://hosting.portal.azure.net/api/diagnostics",
  Fairfax: "https://hosting.azureportal.usgovcloudapi.net/api/diagnostics",
  Mooncake: "https://hosting.azureportal.chinacloudapi.cn/api/diagnostics",
} as const;

const diagnostics = ref<Diagnostics>();
const selectedExtension = ref<ExtensionInfo>();
const currentEnvironment = ref<Environment>(Environments.Public);
const selectedTab = ref<string>("extensions");
const mounted = ref(false);

const environmentName = computed(() => {
  switch (currentEnvironment.value) {
    case Environments.Public:
      return "Public Cloud";
    case Environments.Fairfax:
      return "Fairfax";
    case Environments.Mooncake:
      return "Mooncake";
    default:
      return "Select environment";
  }
});

const showPaasServerless = computed(() =>
  isExtensionInfo(diagnostics.value?.extensions["paasserverless"])
);

const environments = computed<DropdownMenuItem[]>(() => [
  {
    label: "Public Cloud",
    onSelect: () => switchEnvironment(Environments.Public),
  },
  {
    label: "Fairfax",
    onSelect: () => switchEnvironment(Environments.Fairfax),
  },
  {
    label: "Mooncake",
    onSelect: () => switchEnvironment(Environments.Mooncake),
  },
]);

const tabs = computed<TabsItem[]>(() => [
  { label: "Extensions", value: "extensions" },
  { label: "Build Information", value: "build" },
  { label: "Server Information", value: "server" },
]);

async function switchEnvironment(env: Environment) {
  currentEnvironment.value = env;
  selectedExtension.value = undefined;
  await fetchDiagnostics();
}

async function fetchDiagnostics() {
  const response = await fetch(currentEnvironment.value);
  diagnostics.value = await response.json();
}

function handleLinkClick(_: MouseEvent, item?: KeyedNavLink) {
  console.log("Link clicked:", item);

  if (item && diagnostics.value?.extensions) {
    const extension = diagnostics.value.extensions[item.key];
    if (isExtensionInfo(extension)) {
      selectedExtension.value = extension;
    }
  }
}

function selectExtension(key: string) {
  const extension = diagnostics.value?.extensions[key];
  if (isExtensionInfo(extension)) {
    selectedExtension.value = extension;
  }
}

onMounted(async () => {
  await fetchDiagnostics();
  mounted.value = true;
});
</script>

<style type="css">
#__nuxt {
  height: 100%;
}
</style>
