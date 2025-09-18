import { render } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import ServerInfo from './ServerInfo.svelte';

describe('ServerInfo', () => {
	it('renders server info table', () => {
		const props = {
			deploymentId: 'deploy123',
			extensionSync: { totalSyncAllCount: 42 },
			hostname: 'host',
			nodeVersions: 'v18.0.0',
			serverId: 'srv1',
			uptime: 1000
		};
		const { getByText } = render(ServerInfo, { props });
		expect(getByText('Hostname')).toBeInTheDocument();
		expect(getByText('host')).toBeInTheDocument();
		expect(getByText('Uptime')).toBeInTheDocument();
		expect(getByText('1000')).toBeInTheDocument();
		expect(getByText('Server ID')).toBeInTheDocument();
		expect(getByText('srv1')).toBeInTheDocument();
		expect(getByText('Deployment ID')).toBeInTheDocument();
		expect(getByText('deploy123')).toBeInTheDocument();
		expect(getByText('Node Versions')).toBeInTheDocument();
		expect(getByText('v18.0.0')).toBeInTheDocument();
		expect(
			getByText('Extension Sync | Total Sync All Count')
		).toBeInTheDocument();
		expect(getByText('42')).toBeInTheDocument();
	});
});
