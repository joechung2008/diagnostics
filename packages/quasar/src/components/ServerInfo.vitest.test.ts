import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import ServerInfo from './ServerInfo.vue';

describe('ServerInfo', () => {
  const baseProps = {
    hostname: 'server.example.com',
    serverId: 'srv-123',
    deploymentId: 'dep-456',
    extensionSync: {
      totalSyncAllCount: 42,
    },
  };

  it('should render basic server info in table', () => {
    const wrapper = mount(ServerInfo, {
      props: baseProps,
    });

    const table = wrapper.findComponent({ name: 'q-markup-table' });
    expect(table.exists()).toBe(true);
    expect(table.props('flat')).toBe(true);

    const rows = wrapper.findAll('tbody tr');
    expect(rows).toHaveLength(4);

    // Check each row
    const hostnameCells = rows[0]?.findAll('td');
    expect(hostnameCells?.[0]?.text()).toBe('Hostname');
    expect(hostnameCells?.[1]?.text()).toBe('server.example.com');

    const serverIdCells = rows[1]?.findAll('td');
    expect(serverIdCells?.[0]?.text()).toBe('Server ID');
    expect(serverIdCells?.[1]?.text()).toBe('srv-123');

    const deploymentIdCells = rows[2]?.findAll('td');
    expect(deploymentIdCells?.[0]?.text()).toBe('Deployment ID');
    expect(deploymentIdCells?.[1]?.text()).toBe('dep-456');

    const extensionSyncCells = rows[3]?.findAll('td');
    expect(extensionSyncCells?.[0]?.text()).toBe('Extension Sync | Total Sync All Count');
    expect(extensionSyncCells?.[1]?.text()).toBe('42');
  });

  it('should include uptime when provided', () => {
    const wrapper = mount(ServerInfo, {
      props: {
        ...baseProps,
        uptime: 3600,
      },
    });

    expect(wrapper.findComponent({ name: 'q-markup-table' }).exists()).toBe(true);

    const rows = wrapper.findAll('tbody tr');
    expect(rows).toHaveLength(5);

    // Check that uptime row exists
    const uptimeRow = rows.find((row) => row.findAll('td')[0]?.text() === 'Uptime');
    expect(uptimeRow).toBeDefined();
    const uptimeCells = uptimeRow?.findAll('td');
    expect(uptimeCells?.[1]?.text()).toBe('3600');
  });

  it('should include node versions when provided', () => {
    const wrapper = mount(ServerInfo, {
      props: {
        ...baseProps,
        nodeVersions: 'v18.17.0',
      },
    });

    expect(wrapper.findComponent({ name: 'q-markup-table' }).exists()).toBe(true);

    const rows = wrapper.findAll('tbody tr');
    expect(rows).toHaveLength(5);

    // Check that node versions row exists
    const nodeVersionsRow = rows.find((row) => row.findAll('td')[0]?.text() === 'Node Versions');
    expect(nodeVersionsRow).toBeDefined();
    const nodeVersionCells = nodeVersionsRow?.findAll('td');
    expect(nodeVersionCells?.[1]?.text()).toBe('v18.17.0');
  });

  it('should include both uptime and node versions when both provided', () => {
    const wrapper = mount(ServerInfo, {
      props: {
        ...baseProps,
        uptime: 7200,
        nodeVersions: 'v20.5.0',
      },
    });

    expect(wrapper.findComponent({ name: 'q-markup-table' }).exists()).toBe(true);

    const rows = wrapper.findAll('tbody tr');
    expect(rows).toHaveLength(6);

    // Check that both optional rows exist
    const uptimeRow = rows.find((row) => row.findAll('td')[0]?.text() === 'Uptime');
    expect(uptimeRow).toBeDefined();
    const uptimeCells = uptimeRow?.findAll('td');
    expect(uptimeCells?.[1]?.text()).toBe('7200');

    const nodeVersionsRow = rows.find((row) => row.findAll('td')[0]?.text() === 'Node Versions');
    expect(nodeVersionsRow).toBeDefined();
    const nodeVersionCells = nodeVersionsRow?.findAll('td');
    expect(nodeVersionCells?.[1]?.text()).toBe('v20.5.0');
  });

  it('should exclude optional fields when not provided', () => {
    const wrapper = mount(ServerInfo, {
      props: baseProps,
    });

    expect(wrapper.findComponent({ name: 'q-markup-table' }).exists()).toBe(true);

    const rows = wrapper.findAll('tbody tr');
    expect(rows).toHaveLength(4); // hostname, serverId, deploymentId, extensionSync

    // Check that optional fields are not present
    const rowTexts = rows.map((row) => row.findAll('td')[0]?.text());
    expect(rowTexts).not.toContain('Uptime');
    expect(rowTexts).not.toContain('Node Versions');
  });

  it('should have correct table headers', () => {
    const wrapper = mount(ServerInfo, {
      props: baseProps,
    });

    expect(wrapper.findComponent({ name: 'q-markup-table' }).exists()).toBe(true);

    const headers = wrapper.findAll('thead th');
    expect(headers).toHaveLength(2);
    expect(headers[0]?.text()).toBe('Name');
    expect(headers[1]?.text()).toBe('Value');
  });
});
