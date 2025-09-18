import { fireEvent, render, screen, within } from '@testing-library/svelte';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import Page from './+page.svelte';

export interface QueryMockState<T = unknown> {
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

describe('+page route', () => {
	beforeEach(() => {
		queryMockValue = {
			data: {
				extensions: {
					paasserverless: {
						extensionName: 'paasserverless',
						config: {},
						stageDefinition: {}
					},
					websites: {
						extensionName: 'websites',
						config: {},
						stageDefinition: {}
					}
				},
				buildInfo: { buildVersion: '1.2.3' },
				serverInfo: {
					deploymentId: 'dep1',
					extensionSync: { totalSyncAllCount: 0 },
					hostname: 'srv1',
					nodeVersions: 'v18',
					serverId: 'server-1',
					uptime: 12345
				}
			},
			isLoading: false,
			error: null,
			refetch: vi.fn()
		};

		vi.mock('@tanstack/svelte-query', () => ({
			createQuery: () => mockQueryStore(queryMockValue)
		}));
	});

	it('selects an extension via nav tile', async () => {
		render(Page);

		const tiles = screen.getAllByTestId('nav-tile');
		const tile = tiles.find((t) => within(t).queryByText('paasserverless')) as
			| HTMLElement
			| undefined;
		expect(tile).toBeTruthy();

		await fireEvent.click(tile as HTMLElement);

		const panel = screen.getByRole('tabpanel');
		expect(within(panel).getByText('paasserverless')).toBeTruthy();
	});

	it('changing environment clears selection and calls refetch', async () => {
		const refetch = vi.fn();

		// replace the store with a refetch spy
		queryMockValue.refetch = refetch;

		render(Page);

		// select an extension to set selectedExtension
		const appBar = screen.getByTestId('app-bar');
		const pa = within(appBar).getByRole('button', { name: /paasserverless/i });
		await fireEvent.click(pa);

		const panel = screen.getByRole('tabpanel');
		expect(within(panel).getByText('paasserverless')).toBeTruthy();

		// change environment via the segment control — pick the second option
		const segment = screen.getByTestId('segment');
		const inputs = within(segment).getAllByTestId('segment-item-input');
		// click the second environment input
		await fireEvent.click(inputs[1]);

		// selection cleared (no panel text)
		expect(() => screen.getByRole('tabpanel')).toThrow();

		// refetch should have been called
		expect(refetch).toHaveBeenCalled();
	});

	it('does not show paasserverless quick button when extension missing', async () => {
		// remove paasserverless from the diagnostics
		delete queryMockValue.data?.extensions?.paasserverless;

		render(Page);

		// quick button should not be present
		const appBar = screen.getByTestId('app-bar');
		expect(
			within(appBar).queryByRole('button', { name: /paasserverless/i })
		).toBeNull();
	});

	it('app bar websites quick button opens websites extension', async () => {
		render(Page);

		const appBar = screen.getByTestId('app-bar');
		const websitesBtn = within(appBar).getByRole('button', {
			name: /websites/i
		});
		expect(websitesBtn).toBeTruthy();

		await fireEvent.click(websitesBtn);

		const panel = screen.getByRole('tabpanel');
		expect(within(panel).getByText('websites')).toBeTruthy();
	});

	afterEach(() => {
		vi.resetAllMocks();
	});

	it('renders extensions and allows selecting an extension', async () => {
		render(Page);

		// The Extensions tab should be selected by default and show extension controls
		expect(screen.getByText('Extensions')).toBeTruthy();

		// Buttons in the app bar for known extensions should exist — select the actual button
		const appBar = screen.getByTestId('app-bar');
		const pa = within(appBar).getByRole('button', { name: /paasserverless/i });
		expect(pa).toBeTruthy();

		// Click the paasserverless quick button and expect the extension panel to render
		await fireEvent.click(pa);

		// The extension component renders the extension name (Extension.svelte shows extensionName)
		const panel = screen.getByRole('tabpanel');
		expect(within(panel).getByText('paasserverless')).toBeTruthy();
	});

	it('shows build info and server info when switching tabs', async () => {
		render(Page);

		// Switch to Build tab
		const buildTab = screen.getByText('Build Information');
		await fireEvent.click(buildTab);

		// BuildInfo component should be present and show the version
		expect(screen.getByText('1.2.3')).toBeTruthy();

		// Switch to Server tab
		const serverTab = screen.getByText('Server Information');
		await fireEvent.click(serverTab);

		expect(screen.getByText('srv1')).toBeTruthy();
	});
});
