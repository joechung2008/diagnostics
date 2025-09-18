import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import ServerInfoTable from '../ServerInfoTable.vue'

describe('ServerInfoTable', () => {
  it('renders server info', () => {
    const wrapper = mount(ServerInfoTable, {
      props: {
        hostname: 'my-host',
        uptime: 24,
        serverId: 'srv-123',
        deploymentId: 'dep-456',
        nodeVersions: 'v18.0.0',
        extensionSync: { totalSyncAllCount: 42 },
      },
    })
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
