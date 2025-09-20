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

    const table = wrapper.findComponent({ name: 'q-table' });
    expect(table.exists()).toBe(true);
    expect(table.props('flat')).toBe(true);

    const rows = table.props('rows');
    expect(rows).toEqual([
      { name: 'Hostname', value: 'server.example.com' },
      { name: 'Server ID', value: 'srv-123' },
      { name: 'Deployment ID', value: 'dep-456' },
      { name: 'Extension Sync | Total Sync All Count', value: '42' },
    ]);
  });

  it('should include uptime when provided', () => {
    const wrapper = mount(ServerInfo, {
      props: {
        ...baseProps,
        uptime: 3600,
      },
    });

    const table = wrapper.findComponent({ name: 'q-table' });
    const rows = table.props('rows');

    expect(rows).toContainEqual({ name: 'Uptime', value: '3600' });
    expect(rows).toHaveLength(5);
  });

  it('should include node versions when provided', () => {
    const wrapper = mount(ServerInfo, {
      props: {
        ...baseProps,
        nodeVersions: 'v18.17.0',
      },
    });

    const table = wrapper.findComponent({ name: 'q-table' });
    const rows = table.props('rows');

    expect(rows).toContainEqual({ name: 'Node Versions', value: 'v18.17.0' });
    expect(rows).toHaveLength(5);
  });

  it('should include both uptime and node versions when both provided', () => {
    const wrapper = mount(ServerInfo, {
      props: {
        ...baseProps,
        uptime: 7200,
        nodeVersions: 'v20.5.0',
      },
    });

    const table = wrapper.findComponent({ name: 'q-table' });
    const rows = table.props('rows');

    expect(rows).toHaveLength(6);
    expect(rows).toContainEqual({ name: 'Uptime', value: '7200' });
    expect(rows).toContainEqual({ name: 'Node Versions', value: 'v20.5.0' });
  });

  it('should exclude optional fields when not provided', () => {
    const wrapper = mount(ServerInfo, {
      props: baseProps,
    });

    const table = wrapper.findComponent({ name: 'q-table' });
    const rows = table.props('rows') as Array<{ name: string; value: string }>;

    expect(rows).toHaveLength(4); // hostname, serverId, deploymentId, extensionSync
    expect(rows.some((row) => row.name === 'Uptime')).toBe(false);
    expect(rows.some((row) => row.name === 'Node Versions')).toBe(false);
  });

  it('should have correct column configuration', () => {
    const wrapper = mount(ServerInfo, {
      props: baseProps,
    });

    const table = wrapper.findComponent({ name: 'q-table' });
    const columns = table.props('columns');

    expect(columns).toHaveLength(2);
    expect(columns[0]).toEqual({
      name: 'name',
      label: 'Name',
      field: 'name',
      align: 'left',
    });
    expect(columns[1]).toEqual({
      name: 'value',
      label: 'Value',
      field: 'value',
      align: 'left',
    });
  });
});
