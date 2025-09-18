import { render } from '@testing-library/svelte'
import { describe, expect, it } from 'vitest'
import BuildInfo from '../BuildInfo.svelte'

describe('BuildInfo', () => {
  it('should render build version correctly', () => {
    const { container } = render(BuildInfo, {
      props: {
        buildVersion: '1.2.3'
      }
    })

    expect(container).toMatchSnapshot()
  })

  it('should render different build version', () => {
    const { container } = render(BuildInfo, {
      props: {
        buildVersion: '2.0.0-beta.1'
      }
    })

    expect(container).toMatchSnapshot()
  })
})
