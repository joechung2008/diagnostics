<script lang="ts">
	import { browser } from '$app/environment';
	import { isExtensionInfo } from '$lib';
	import BuildInfo from '$lib/components/BuildInfo.svelte';
	import Extension from '$lib/components/Extension.svelte';
	import Extensions from '$lib/components/Extensions.svelte';
	import ServerInfo from '$lib/components/ServerInfo.svelte';
	import { createQuery } from '@tanstack/svelte-query';
	import {
		Content,
		Header,
		HeaderGlobalAction,
		HeaderUtilities,
		SideNav,
		SideNavDivider,
		SideNavItems,
		SideNavLink,
		SideNavMenu,
		SideNavMenuItem,
		SkipToContent
	} from 'carbon-components-svelte';
	import { Apps, BareMetalServer, BuildImage } from 'carbon-icons-svelte';
	import { onMount } from 'svelte';

	type Environment = (typeof Environment)[keyof typeof Environment];

	const Environment = {
		Public: 'https://hosting.portal.azure.net/api/diagnostics',
		Fairfax: 'https://hosting.azureportal.usgovcloudapi.net/api/diagnostics',
		Mooncake: 'https://hosting.azureportal.chinacloudapi.cn/api/diagnostics'
	} as const;

	function getEnvironmentName(environment: Environment | undefined): string {
		switch (environment) {
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

	let isSideNavOpen = $state(false);
	let selectedEnvironment = $state<Environment>(Environment.Public);
	let selectedExtension = $state<ExtensionInfo | undefined>();
	let selectedTabIndex = $state(0);

	const diagnosticsQuery = createQuery({
		enabled: browser,
		queryFn: async () => {
			const response = await fetch(selectedEnvironment);
			if (!response.ok) {
				throw new Error(`Failed to fetch diagnostics: ${response.statusText}`);
			}
			return response.json() as Promise<Diagnostics>;
		},
		queryKey: ['diagnostics', () => selectedEnvironment]
	});

	onMount(() => {
		$diagnosticsQuery.refetch();
	});

	const handleLinkClick = (item?: KeyedNavLink) => {
		if (item) {
			const extension = $diagnosticsQuery.data?.extensions[item.key];
			if (isExtensionInfo(extension)) {
				isSideNavOpen = false;
				selectedExtension = extension;
			}
		}
	};

	const showPaasServerless = $derived(
		isExtensionInfo($diagnosticsQuery.data?.extensions['paasserverless'])
	);

	const environmentOptions = Object.entries(Environment).map(([, value]) => ({
		id: value,
		text: getEnvironmentName(value)
	}));

	const handleEnvironmentChange = (selectedItem: { id: string; text: string }) => {
		selectedExtension = undefined;
		selectedEnvironment = selectedItem.id as Environment;
		$diagnosticsQuery.refetch();
	};

	const handlePaasServerlessClick = () => {
		const ext = $diagnosticsQuery.data?.extensions['paasserverless'];
		if (isExtensionInfo(ext)) {
			isSideNavOpen = false;
			selectedExtension = ext;
			selectedTabIndex = 0;
		}
	};

	const handleWebsitesClick = () => {
		const ext = $diagnosticsQuery.data?.extensions['websites'];
		if (isExtensionInfo(ext)) {
			isSideNavOpen = false;
			selectedExtension = ext;
			selectedTabIndex = 0;
		}
	};
</script>

<Header persistentHamburgerMenu platformName="Azure Portal Extensions" bind:isSideNavOpen>
	<svelte:fragment slot="skip-to-content">
		<SkipToContent />
	</svelte:fragment>

	<HeaderUtilities>
		<HeaderGlobalAction
			icon={Apps}
			iconDescription="Extensions"
			on:click={() => {
				selectedTabIndex = 0;
			}}
		/>
		<HeaderGlobalAction
			icon={BuildImage}
			iconDescription="Build information"
			on:click={() => {
				selectedTabIndex = 1;
			}}
		/>
		<HeaderGlobalAction
			icon={BareMetalServer}
			iconDescription="Server information"
			on:click={() => {
				selectedTabIndex = 2;
			}}
		/>
	</HeaderUtilities>
</Header>

<SideNav bind:isOpen={isSideNavOpen}>
	<SideNavItems>
		<SideNavMenu expanded text="Environments">
			{#each environmentOptions as option (option.id)}
				<SideNavMenuItem
					isSelected={selectedEnvironment === option.text}
					text={option.text}
					on:click={() => handleEnvironmentChange(option)}
				/>
			{/each}
		</SideNavMenu>

		<SideNavDivider />

		{#if showPaasServerless}
			<SideNavLink text="paasserverless" on:click={handlePaasServerlessClick} />
		{/if}

		<SideNavLink text="websites" on:click={handleWebsitesClick} />

		<SideNavDivider />

		<Extensions
			extensions={$diagnosticsQuery.data?.extensions ?? {}}
			onLinkClick={handleLinkClick}
		/>
	</SideNavItems>
</SideNav>

<Content>
	{#if $diagnosticsQuery.isLoading}
		<div class="loading">Loading diagnostics...</div>
	{:else if $diagnosticsQuery.error}
		<div class="error">
			Error loading diagnostics: {$diagnosticsQuery.error.message}
		</div>
	{:else if $diagnosticsQuery.data}
		{#if selectedTabIndex === 0}
			{#if selectedExtension}
				<Extension {...selectedExtension} />
			{:else}
				<div class="deselected">Select an extension</div>
			{/if}
		{:else if selectedTabIndex === 1}
			<BuildInfo {...$diagnosticsQuery.data.buildInfo} />
		{:else if selectedTabIndex === 2}
			<ServerInfo {...$diagnosticsQuery.data.serverInfo} />
		{/if}
	{/if}
</Content>

<style>
	.deselected,
	.error,
	.loading {
		align-items: center;
		display: flex;
		font-size: 1.1rem;
		height: 200px;
		justify-content: center;
	}
</style>
