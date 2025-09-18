import { render } from '@testing-library/svelte'
import { describe, expect, it } from 'vitest'
import Configuration from '../Configuration.svelte'

describe('Configuration', () => {
  it('should render configuration with single key-value pair', () => {
    const { container } = render(Configuration, {
      props: {
        config: {
          'app.name': 'MyApp'
        }
      }
    })

    expect(container).toMatchSnapshot()
  })

  it('should render configuration with multiple key-value pairs', () => {
    const { container } = render(Configuration, {
      props: {
        config: {
          'app.name': 'MyApp',
          'app.version': '1.0.0',
          'database.url': 'postgresql://localhost:5432/mydb',
          'features.logging': 'true'
        }
      }
    })

    expect(container).toMatchSnapshot()
  })

  it('should render empty configuration', () => {
    const { container } = render(Configuration, {
      props: {
        config: {}
      }
    })

    expect(container).toMatchSnapshot()
  })
})
