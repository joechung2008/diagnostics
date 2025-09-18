import { render } from '@testing-library/svelte'
import { describe, expect, it } from 'vitest'
import StageDefinition from '../StageDefinition.svelte'

describe('StageDefinition', () => {
  it('should render stage definition with single stage', () => {
    const { container } = render(StageDefinition, {
      props: {
        stageDefinition: {
          development: ['localhost', 'dev.example.com']
        }
      }
    })

    expect(container).toMatchSnapshot()
  })

  it('should render stage definition with multiple stages', () => {
    const { container } = render(StageDefinition, {
      props: {
        stageDefinition: {
          development: ['localhost', 'dev.example.com'],
          staging: ['staging.example.com', 'api-staging.example.com'],
          production: ['example.com', 'api.example.com', 'cdn.example.com']
        }
      }
    })

    expect(container).toMatchSnapshot()
  })

  it('should render stage definition with empty arrays', () => {
    const { container } = render(StageDefinition, {
      props: {
        stageDefinition: {
          development: [],
          staging: [],
          production: ['example.com']
        }
      }
    })

    expect(container).toMatchSnapshot()
  })

  it('should render empty stage definition', () => {
    const { container } = render(StageDefinition, {
      props: {
        stageDefinition: {}
      }
    })

    expect(container).toMatchSnapshot()
  })
})
