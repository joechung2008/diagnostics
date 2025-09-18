<script lang="ts">
	import { browser } from '$app/environment';
	import { isExtensionInfo } from '$lib';
	import BuildInfo from '$lib/components/BuildInfo.svelte';
	import Extension from '$lib/components/Extension.svelte';
	import Extensions from '$lib/components/Extensions.svelte';
	import ServerInfo from '$lib/components/ServerInfo.svelte';
	import Button from '@smui/button';
	import Tab, { Label } from '@smui/tab';
	import TabBar from '@smui/tab-bar';
	import TopAppBar, { Row, Section } from '@smui/top-app-bar';
	import { createQuery } from '@tanstack/svelte-query';
	import { onMount } from 'svelte';

	const Environment = {
		Public: 'https://hosting.portal.azure.net/api/diagnostics',
		Fairfax: 'https://hosting.azureportal.usgovcloudapi.net/api/diagnostics',
		Mooncake: 'https://hosting.azureportal.chinacloudapi.cn/api/diagnostics'
	};

	let environments = $state({ environment: [Environment.Public] });
	let extension: ExtensionInfo | undefined = $state(undefined);
	let active = $state('Extensions');

	let environment = $derived(environments.environment[0]);

	function getEnvironmentName(env: string | undefined) {
		switch (env) {
			case Environment.Public:
				return 'Public Cloud';
			case Environment.Fairfax:
				return 'Fairfax';
			case Environment.Mooncake:
				return 'Mooncake';
		}
	}

	const query = createQuery({
		queryKey: ['diagnostics'],
		queryFn: async () => {
			const res = await fetch(environment);
			if (!res.ok) {
				throw new Error('Failed to fetch diagnostics');
			}
			return res.json();
		},
		enabled: browser
	});

	onMount(() => {
		$query.refetch();
	});

	let data = $derived<Diagnostics | undefined>($query.data);
	let isLoading = $derived($query.isLoading);
	let error = $derived($query.error);

	function handleLinkClick(_: CustomEvent<unknown>, item: KeyedNavLink) {
		const ext = data?.extensions[item.key];
		if (isExtensionInfo(ext)) {
			extension = ext;
		}
	}

	function handleToolbarClick(key: string) {
		const ext = data?.extensions[key];
		if (isExtensionInfo(ext)) {
			extension = ext;
			active = 'Extensions';
		}
	}
</script>

<div class="flexbox">
	<TopAppBar variant="static">
		<Row>
			<Section align="start" style="align-items: center; gap: 0.5rem;">
				{#each Object.entries(Environment) as [key, value] (key)}
					<Button
						color={environment === value ? 'primary' : undefined}
						variant={environment === value ? 'raised' : 'text'}
						onclick={() => {
							environments = { environment: [value] };
							extension = undefined;
							$query.refetch();
						}}
					>
						{getEnvironmentName(value)}
					</Button>
				{/each}
			</Section>
			<Section align="end" style="align-items: center; gap: 0.5rem;">
				{#if data?.extensions.paasserverless}
					<Button
						color="secondary"
						variant="text"
						onclick={() => handleToolbarClick('paasserverless')}
					>
						paasserverless
					</Button>
				{/if}
				<Button
					color="secondary"
					variant="text"
					onclick={() => handleToolbarClick('websites')}
				>
					websites
				</Button>
			</Section>
		</Row>
	</TopAppBar>
	<TabBar tabs={['Extensions', 'Build', 'Server']} bind:active>
		{#snippet tab(tab)}
			<Tab {tab}>
				<Label>{tab}</Label>
			</Tab>
		{/snippet}
	</TabBar>
	{#if isLoading}
		<div>Loading...</div>
	{:else if error}
		<div>Error loading diagnostics</div>
	{:else}
		{#if active === 'Extensions' && data?.extensions}
			<div class="tab-panel">
				<div class="stack">
					<Extensions
						extensions={data.extensions}
						onLinkClick={handleLinkClick}
					/>
					{#if extension}
						<Extension {...extension} />
					{/if}
				</div>
			</div>
		{/if}
		{#if active === 'Build' && data?.buildInfo}
			<div class="tab-panel">
				<BuildInfo {...data.buildInfo} />
			</div>
		{/if}
		{#if active === 'Server' && data?.serverInfo}
			<div class="tab-panel">
				<ServerInfo {...data.serverInfo} />
			</div>
		{/if}
	{/if}
</div>

<style>
	.flexbox {
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		height: 100vh;
	}

	.tab-panel {
		box-sizing: border-box;
		flex: 1;
		overflow-y: auto;
	}

	.stack {
		display: flex;
		flex-direction: row;
		gap: 1rem;
		height: 100%;
	}
</style>
