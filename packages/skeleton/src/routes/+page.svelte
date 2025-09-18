<script lang="ts">
	import { browser } from '$app/environment';
	import { isExtensionInfo } from '$lib';
	import BuildInfo from '$lib/components/BuildInfo.svelte';
	import Extension from '$lib/components/Extension.svelte';
	import Extensions from '$lib/components/Extensions.svelte';
	import ServerInfo from '$lib/components/ServerInfo.svelte';
	import { AppBar, Segment, Tabs } from '@skeletonlabs/skeleton-svelte';
	import { createQuery } from '@tanstack/svelte-query';
	import { onMount } from 'svelte';

	const Environment = {
		Public: 'https://hosting.portal.azure.net/api/diagnostics',
		Fairfax: 'https://hosting.azureportal.usgovcloudapi.net/api/diagnostics',
		Mooncake: 'https://hosting.azureportal.chinacloudapi.cn/api/diagnostics'
	} as const;

	function getEnvironmentName(env?: string) {
		switch (env) {
			case Environment.Public:
				return 'Public Cloud';
			case Environment.Fairfax:
				return 'Fairfax';
			case Environment.Mooncake:
				return 'Mooncake';
			default:
				return 'Select environment';
		}
	}

	let environment = $state<string>(Environment.Public);
	let selectedTab = $state('extensions');
	let selectedExtension = $state<ExtensionInfo | undefined>();

	const query = createQuery({
		queryFn: async () => {
			const response = await fetch(environment);
			if (!response.ok) {
				throw new Error(`Failed to fetch diagnostics: ${response.statusText}`);
			} else {
				return response.json();
			}
		},
		queryKey: ['diagnostics'],
		enabled: browser
	});

	onMount(() => {
		$query.refetch();
	});

	let diagnostics = $derived<Diagnostics | undefined>($query.data);
	let showPaasServerless = $derived.by(
		() => diagnostics?.extensions?.['paasserverless'] !== undefined
	);

	function handleLinkClick(link: KeyedNavLink) {
		const ext = diagnostics?.extensions[link.key];
		if (isExtensionInfo(ext)) {
			selectedExtension = ext;
		}
	}

	function handleEnvironmentChange(value: string) {
		environment = value;
		selectedExtension = undefined;
		$query.refetch();
	}
</script>

<div class="flex h-screen flex-col gap-2">
	<AppBar>
		{#snippet lead()}
			<Segment
				value={environment}
				onValueChange={(e) => {
					if (e.value) {
						handleEnvironmentChange(e.value);
					}
				}}
			>
				{#each Object.entries(Environment) as [key, value] (key)}
					<Segment.Item {value}>{getEnvironmentName(value)}</Segment.Item>
				{/each}
			</Segment>
		{/snippet}

		{#snippet trail()}
			<div class="flex items-center gap-2">
				{#if showPaasServerless}
					<button
						class="btn-ghost btn"
						onclick={() => {
							const ext = diagnostics?.extensions?.['paasserverless'];
							if (isExtensionInfo(ext)) {
								selectedExtension = ext;
								selectedTab = 'extensions';
							}
						}}
					>
						paasserverless
					</button>
				{/if}

				<button
					class="btn-ghost btn"
					onclick={() => {
						const ext = diagnostics?.extensions?.['websites'];
						if (isExtensionInfo(ext)) {
							selectedExtension = ext;
							selectedTab = 'extensions';
						}
					}}
				>
					websites
				</button>
			</div>
		{/snippet}
	</AppBar>

	<Tabs value={selectedTab} onValueChange={(e) => (selectedTab = e.value)}>
		{#snippet list()}
			<Tabs.Control value="extensions">Extensions</Tabs.Control>
			<Tabs.Control value="build">Build Information</Tabs.Control>
			<Tabs.Control value="server">Server Information</Tabs.Control>
		{/snippet}
	</Tabs>

	{#if selectedTab === 'extensions' && diagnostics?.extensions}
		<div class="flex-1 overflow-y-auto">
			<div class="flex h-full flex-row gap-4">
				<Extensions
					extensions={diagnostics.extensions}
					onLinkClick={handleLinkClick}
				/>
				{#if selectedExtension}
					<Extension
						extensionName={selectedExtension.extensionName}
						config={selectedExtension.config}
						stageDefinition={selectedExtension.stageDefinition}
					/>
				{/if}
			</div>
		</div>
	{/if}

	{#if selectedTab === 'build' && diagnostics?.buildInfo}
		<div class="flex-1 overflow-y-auto">
			<BuildInfo {...diagnostics.buildInfo} />
		</div>
	{/if}

	{#if selectedTab === 'server' && diagnostics?.serverInfo}
		<div class="flex-1 overflow-y-auto">
			<ServerInfo {...diagnostics.serverInfo} />
		</div>
	{/if}
</div>
