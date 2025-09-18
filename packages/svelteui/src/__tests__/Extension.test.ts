import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/svelte'
import Extension from '../Extension.svelte'

describe('Extension', () => {
  it('should render extension with only name', () => {
    const { container } = render(Extension, {
      props: {
        extensionName: 'TestExtension'
      }
    })

    expect(container).toMatchSnapshot()
  })

  it('should render extension with name and config', () => {
    const { container } = render(Extension, {
      props: {
        extensionName: 'DatabaseExtension',
        config: {
          'db.host': 'localhost',
          'db.port': '5432',
          'db.name': 'myapp'
        }
      }
    })

    expect(container).toMatchSnapshot()
  })

  it('should render extension with name and stage definition', () => {
    const { container } = render(Extension, {
      props: {
        extensionName: 'ApiExtension',
        stageDefinition: {
          development: ['localhost:3000', 'dev.api.com'],
          production: ['api.com', 'api.example.com']
        }
      }
    })

    expect(container).toMatchSnapshot()
  })

  it('should render extension with name, config, and stage definition', () => {
    const { container } = render(Extension, {
      props: {
        extensionName: 'FullFeaturedExtension',
        config: {
          'api.version': 'v1',
          'auth.enabled': 'true',
          'rate.limit': '1000'
        },
        stageDefinition: {
          development: ['localhost:8080'],
          staging: ['staging-api.com'],
          production: ['api.production.com', 'api-backup.production.com']
        }
      }
    })

    expect(container).toMatchSnapshot()
  })

  it('should render extension with empty config object', () => {
    const { container } = render(Extension, {
      props: {
        extensionName: 'EmptyConfigExtension',
        config: {}
      }
    })

    expect(container).toMatchSnapshot()
  })

  it('should render extension with empty stage definition object', () => {
    const { container } = render(Extension, {
      props: {
        extensionName: 'EmptyStageExtension',
        stageDefinition: {}
      }
    })

    expect(container).toMatchSnapshot()
  })

  it('should render extension with special characters in name', () => {
    const { container } = render(Extension, {
      props: {
        extensionName: 'Test_Extension-v2.1.0'
      }
    })

    expect(container).toMatchSnapshot()
  })
})
