import { render, screen } from '@testing-library/svelte';
import { afterEach, describe, expect, it, vi } from 'vitest';
import ServerInfo from './ServerInfo.svelte';

afterEach(() => {
	vi.restoreAllMocks();
	vi.resetModules();
});

describe('ServerInfo', () => {
	it('renders server info rows', () => {
		const props = {
			deploymentId: 'dep-1',
			extensionSync: { totalSyncAllCount: 5 },
			hostname: 'host.example',
			nodeVersions: 'v18',
			serverId: 'srv-9',
			uptime: 86400
		};

		render(ServerInfo, { ...props });

		expect(screen.getByText('Hostname')).toBeInTheDocument();
		expect(screen.getByText('host.example')).toBeInTheDocument();
		expect(screen.getByText('Server ID')).toBeInTheDocument();
		expect(screen.getByText('srv-9')).toBeInTheDocument();
		expect(screen.getByText('Extension Sync | Total Sync All Count')).toBeInTheDocument();
		expect(screen.getByText('5')).toBeInTheDocument();
	});
});
