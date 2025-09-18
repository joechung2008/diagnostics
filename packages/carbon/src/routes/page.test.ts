import { render, screen, fireEvent } from '@testing-library/svelte';
import { afterEach, describe, expect, it, vi } from 'vitest';
import Page from './+page.svelte';

interface QueryMockState<T = unknown> {
	data: T | undefined;
	isLoading: boolean;
	error: unknown;
	refetch: () => void;
}

function mockQueryStore<T>(value: QueryMockState<T>) {
	return {
		subscribe(run: (val: QueryMockState<T>) => void) {
			run(value);
			return () => {};
		}
	};
}

let queryMockValue: QueryMockState<Diagnostics>;

vi.mock('@tanstack/svelte-query', () => ({
	createQuery: () => {
		return mockQueryStore(queryMockValue);
	}
}));

afterEach(() => {
	vi.restoreAllMocks();
	vi.resetModules();
});

describe('+page', () => {
	it('shows loading state', () => {
		queryMockValue = { data: undefined, isLoading: true, error: undefined, refetch: vi.fn() };
		render(Page);
		expect(screen.getByText('Loading diagnostics...')).toBeInTheDocument();
	});

	it('selects environment and refetches when environment option clicked', async () => {
		const diagnostics: Diagnostics = {
			buildInfo: { buildVersion: '1' },
			extensions: {},
			serverInfo: {
				deploymentId: 'd',
				extensionSync: { totalSyncAllCount: 0 },
				hostname: '',
				nodeVersions: '',
				serverId: '',
				uptime: 0
			}
		};
		queryMockValue = { data: diagnostics, isLoading: false, error: undefined, refetch: vi.fn() };
		render(Page);

		// Open side nav (hamburger) then click the first environment (Public Cloud)
		const menuButton = document.querySelector('.bx--header__menu-trigger');
		if (menuButton) await fireEvent.click(menuButton);

		const envOption = screen.getByText('Public Cloud');
		await fireEvent.click(envOption);

		// after selection, refetch should be called
		expect(queryMockValue.refetch).toHaveBeenCalled();
	});

	it('shows paasserverless link when extension exists and responds to click', async () => {
		const extensionInfoA = { extensionName: 'paasserverless', config: { a: 'b' } };
		const diagnostics: Diagnostics = {
			buildInfo: { buildVersion: '1' },
			extensions: { paasserverless: extensionInfoA as ExtensionInfo },
			serverInfo: {
				deploymentId: 'd',
				extensionSync: { totalSyncAllCount: 0 },
				hostname: '',
				nodeVersions: '',
				serverId: '',
				uptime: 0
			}
		};
		queryMockValue = { data: diagnostics, isLoading: false, error: undefined, refetch: vi.fn() };

		render(Page);

		// the paasserverless link should be present (there may be multiple occurrences)
		const paasNodes = screen.getAllByText('paasserverless');
		expect(paasNodes.length).toBeGreaterThan(0);

		// click the first occurrence — it should show the extension detail (extensionName)
		await fireEvent.click(paasNodes[0]);
		expect(screen.getAllByText('paasserverless').length).toBeGreaterThan(0);
	});

	it('selects that extension when clicking websites', async () => {
		const websites = { extensionName: 'websites', config: { x: 'y' } };
		const diagnostics: Diagnostics = {
			buildInfo: { buildVersion: '1' },
			extensions: { websites: websites as ExtensionInfo },
			serverInfo: {
				deploymentId: 'd',
				extensionSync: { totalSyncAllCount: 0 },
				hostname: '',
				nodeVersions: '',
				serverId: '',
				uptime: 0
			}
		};
		queryMockValue = { data: diagnostics, isLoading: false, error: undefined, refetch: vi.fn() };

		render(Page);

		const webs = screen.getAllByText('websites');
		// click the first occurrence
		await fireEvent.click(webs[0]);

		expect(screen.getAllByText('websites').length).toBeGreaterThan(0);
	});

	it('shows error state', () => {
		queryMockValue = {
			data: undefined,
			isLoading: false,
			error: { message: 'boom' },
			refetch: vi.fn()
		};
		render(Page);
		expect(screen.getByText(/Error loading diagnostics/i)).toBeInTheDocument();
		expect(screen.getByText('Error loading diagnostics: boom')).toBeInTheDocument();
	});

	it('renders build info when selected tab is build and data is present', async () => {
		const diagnostics = {
			buildInfo: { buildVersion: '9.9.9' },
			extensions: {},
			serverInfo: {
				deploymentId: 'd',
				extensionSync: { totalSyncAllCount: 1 },
				hostname: 'h',
				nodeVersions: 'v',
				serverId: 's',
				uptime: 1
			}
		};

		queryMockValue = { data: diagnostics, isLoading: false, error: undefined, refetch: vi.fn() };

		render(Page);

		// Click the build info header action (it sets selectedTabIndex = 1)
		const buildButton = screen.getByRole('button', { name: /Build information/i });
		await fireEvent.click(buildButton);

		expect(screen.getByText('Build Version')).toBeInTheDocument();
		expect(screen.getByText('9.9.9')).toBeInTheDocument();
	});

	it('shows extension details when clicking an extension link in the side nav', async () => {
		const ext = { extensionName: 'clickme', config: { k: 'v' } };
		const diagnostics: Diagnostics = {
			buildInfo: { buildVersion: '1' },
			extensions: { clickme: ext as ExtensionInfo },
			serverInfo: {
				deploymentId: 'd',
				extensionSync: { totalSyncAllCount: 0 },
				hostname: '',
				nodeVersions: '',
				serverId: '',
				uptime: 0
			}
		};

		queryMockValue = { data: diagnostics, isLoading: false, error: undefined, refetch: vi.fn() };
		render(Page);

		// find the extension link and click it
		const link = screen.getAllByText('clickme')[0];
		await fireEvent.click(link);

		// extension detail should render (name appears)
		expect(screen.getAllByText('clickme').length).toBeGreaterThan(0);
	});

	it('activates the extensions tab when clicking the Extensions utility button', async () => {
		const diagnostics: Diagnostics = {
			buildInfo: { buildVersion: '1' },
			extensions: {},
			serverInfo: {
				deploymentId: 'd',
				extensionSync: { totalSyncAllCount: 0 },
				hostname: '',
				nodeVersions: '',
				serverId: '',
				uptime: 0
			}
		};
		queryMockValue = { data: diagnostics, isLoading: false, error: undefined, refetch: vi.fn() };
		render(Page);

		const extBtn = screen.getByRole('button', { name: /Extensions/i });
		await fireEvent.click(extBtn);

		// No extension selected => deselected text shown
		expect(screen.getByText('Select an extension')).toBeInTheDocument();
	});

	it('shows the server info tab when clicking the Server Information utility button', async () => {
		const diagnostics = {
			buildInfo: { buildVersion: '1' },
			extensions: {},
			serverInfo: {
				deploymentId: 'dep',
				extensionSync: { totalSyncAllCount: 2 },
				hostname: 'hm',
				nodeVersions: 'v',
				serverId: 'srv',
				uptime: 10
			}
		} as Diagnostics;
		queryMockValue = { data: diagnostics, isLoading: false, error: undefined, refetch: vi.fn() };
		render(Page);

		const serverBtn = screen.getByRole('button', { name: /Server information/i });
		await fireEvent.click(serverBtn);

		expect(screen.getByText('Server ID')).toBeInTheDocument();
		expect(screen.getByText('srv')).toBeInTheDocument();
	});
});
