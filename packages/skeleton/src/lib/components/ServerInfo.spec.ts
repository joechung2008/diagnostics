import { render } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import ServerInfo from './ServerInfo.svelte';

describe('ServerInfo component', () => {
	it('renders server info fields', () => {
		const props = {
			deploymentId: 'dep-1',
			extensionSync: { totalSyncAllCount: 5 },
			hostname: 'example.local',
			nodeVersions: 'v18',
			serverId: 'srv-1',
			uptime: 12345
		};
		const { getByText } = render(ServerInfo, props);
		expect(getByText('Hostname')).toBeTruthy();
		expect(getByText('example.local')).toBeTruthy();
	});
});
