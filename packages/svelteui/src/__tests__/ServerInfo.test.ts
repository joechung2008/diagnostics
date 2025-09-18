import { render } from '@testing-library/svelte'
import { describe, expect, it } from 'vitest'
import ServerInfo from '../ServerInfo.svelte'

describe('ServerInfo', () => {
  it('should render server information correctly', () => {
    const { container } = render(ServerInfo, {
      props: {
        deploymentId: 'deploy-12345',
        extensionSync: { totalSyncAllCount: 42 },
        hostname: 'web-server-01',
        nodeVersions: 'v18.17.0',
        serverId: 'srv-abc123',
        uptime: 3600
      }
    })

    expect(container).toMatchSnapshot()
  })

  it('should render with different values', () => {
    const { container } = render(ServerInfo, {
      props: {
        deploymentId: 'prod-deploy-v2.1',
        extensionSync: { totalSyncAllCount: 156 },
        hostname: 'api-gateway-02',
        nodeVersions: 'v20.5.1',
        serverId: 'srv-def456',
        uptime: 86400
      }
    })

    expect(container).toMatchSnapshot()
  })

  it('should render with zero uptime', () => {
    const { container } = render(ServerInfo, {
      props: {
        deploymentId: 'test-deploy',
        extensionSync: { totalSyncAllCount: 0 },
        hostname: 'localhost',
        nodeVersions: 'v19.8.1',
        serverId: 'srv-test001',
        uptime: 0
      }
    })

    expect(container).toMatchSnapshot()
  })
})
