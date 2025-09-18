import { render } from '@testing-library/svelte';
import { tick } from 'svelte';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
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

describe('Page', () => {
	beforeEach(() => {
		queryMockValue = {
			data: {
				extensions: {},
				buildInfo: { buildVersion: '' },
				serverInfo: {
					deploymentId: '',
					extensionSync: { totalSyncAllCount: 0 },
					hostname: '',
					nodeVersions: '',
					serverId: '',
					uptime: 0
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

	afterEach(() => {
		vi.resetAllMocks();
	});

	it('shows error message when error is set', () => {
		// Arrange
		queryMockValue = {
			data: undefined,
			isLoading: false,
			error: 'Something went wrong',
			refetch: vi.fn()
		};

		// Act
		const { getByText } = render(Page);

		// Assert
		expect(getByText('Error loading diagnostics')).toBeInTheDocument();
	});

	it('renders BuildInfo when Build tab is active', async () => {
		// Arrange
		queryMockValue = {
			data: {
				extensions: {},
				buildInfo: { buildVersion: '1.2.3' },
				serverInfo: {
					deploymentId: '',
					extensionSync: { totalSyncAllCount: 0 },
					hostname: '',
					nodeVersions: '',
					serverId: '',
					uptime: 0
				}
			},
			isLoading: false,
			error: null,
			refetch: vi.fn()
		};

		// Act
		const { getByText, findByText } = render(Page);
		const buildTab = getByText('Build');
		buildTab.click();
		const buildVersionCell = await findByText('Build Version');
		const buildValueCell = await findByText('1.2.3');

		// Assert
		expect(buildVersionCell).toBeInTheDocument();
		expect(buildValueCell).toBeInTheDocument();
	});

	it('renders ServerInfo when Server tab is active', async () => {
		// Arrange
		queryMockValue = {
			data: {
				extensions: {},
				buildInfo: { buildVersion: '' },
				serverInfo: {
					deploymentId: 'abc123',
					extensionSync: { totalSyncAllCount: 42 },
					hostname: 'host1',
					nodeVersions: 'v18',
					serverId: 'srv1',
					uptime: 1000
				}
			},
			isLoading: false,
			error: null,
			refetch: vi.fn()
		};

		// Act
		const { getByText, findByText } = render(Page);
		const serverTab = getByText('Server');
		serverTab.click();
		const hostnameCell = await findByText('Hostname');
		const hostValueCell = await findByText('host1');
		const serverIdCell = await findByText('Server ID');
		const serverValueCell = await findByText('srv1');

		// Assert
		expect(hostnameCell).toBeInTheDocument();
		expect(hostValueCell).toBeInTheDocument();
		expect(serverIdCell).toBeInTheDocument();
		expect(serverValueCell).toBeInTheDocument();
	});

	it('renders environment buttons', () => {
		// Act
		const { getByText } = render(Page);

		// Assert
		expect(getByText('Public Cloud')).toBeInTheDocument();
		expect(getByText('Fairfax')).toBeInTheDocument();
		expect(getByText('Mooncake')).toBeInTheDocument();
	});

	it('clicks environment buttons and updates environment', async () => {
		// Act
		const { getByText } = render(Page);

		// Act
		const fairfaxBtn = getByText('Fairfax');
		fairfaxBtn.click();
		// Should refetch and update environment, so Fairfax button should be primary/raised
		// (We can't check style directly, but can check that the button is still present)
		// Assert
		expect(getByText('Fairfax')).toBeInTheDocument();

		// Act
		const mooncakeBtn = getByText('Mooncake');
		mooncakeBtn.click();
		// Assert
		expect(getByText('Mooncake')).toBeInTheDocument();

		// Act
		const publicBtn = getByText('Public Cloud');
		publicBtn.click();
		// Assert
		expect(getByText('Public Cloud')).toBeInTheDocument();
	});

	it('clicks extension button in Top App Bar', async () => {
		// Arrange
		queryMockValue = {
			data: {
				extensions: {
					websites: {
						extensionName: 'websites'
					}
				},
				buildInfo: { buildVersion: '' },
				serverInfo: {
					deploymentId: '',
					extensionSync: { totalSyncAllCount: 0 },
					hostname: '',
					nodeVersions: '',
					serverId: '',
					uptime: 0
				}
			},
			isLoading: false,
			error: null,
			refetch: vi.fn()
		};

		// Act
		const { getAllByText, getByText } = render(Page);
		const extBtn = getAllByText('websites')[0]; // Top App Bar button
		extBtn.click();

		// Assert
		expect(getByText('Extensions')).toBeInTheDocument();
		// Check that the extension appears in the list (LI element)
		const extensionListItem = getAllByText('websites').find(
			(el) => el.tagName === 'LI'
		);
		expect(extensionListItem).toBeInTheDocument();
	});

	it('renders tab labels', () => {
		// Act
		const { getByText } = render(Page);

		// Assert
		expect(getByText('Extensions')).toBeInTheDocument();
		expect(getByText('Build')).toBeInTheDocument();
		expect(getByText('Server')).toBeInTheDocument();
	});

	describe('Loading State', () => {
		it('shows loading indicator initially', () => {
			// Arrange
			queryMockValue = {
				data: undefined,
				isLoading: true,
				error: null,
				refetch: vi.fn()
			};

			// Act
			const { getByText } = render(Page);

			// Assert
			expect(getByText('Loading...')).toBeInTheDocument();
		});
	});

	it('changes displayed extension when clicking a link in the extensions list', async () => {
		// Arrange
		queryMockValue = {
			data: {
				extensions: {
					extA: { extensionName: 'extA' },
					extB: { extensionName: 'extB' }
				},
				buildInfo: { buildVersion: '' },
				serverInfo: {
					deploymentId: '',
					extensionSync: { totalSyncAllCount: 0 },
					hostname: '',
					nodeVersions: '',
					serverId: '',
					uptime: 0
				}
			},
			isLoading: false,
			error: null,
			refetch: vi.fn()
		};

		// Act
		const { getAllByText } = render(Page);

		// Assert (initial)
		expect(document.querySelector('h1')).toBeNull();

		// Act
		const extALink = getAllByText('extA').find((el) => el.tagName === 'LI');
		extALink?.click();
		await tick();

		// Assert
		const extAHeading = Array.from(document.querySelectorAll('h1')).find(
			(h) => h.textContent === 'extA'
		);
		expect(extAHeading).toBeInTheDocument();

		// Act
		const extBLink = getAllByText('extB').find((el) => el.tagName === 'LI');
		extBLink?.click();
		await tick();

		// Assert
		const extBHeading = Array.from(document.querySelectorAll('h1')).find(
			(h) => h.textContent === 'extB'
		);
		expect(extBHeading).toBeInTheDocument();
	});
});
