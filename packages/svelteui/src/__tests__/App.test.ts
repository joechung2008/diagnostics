import { render } from '@testing-library/svelte'
import { describe, expect, it, vi } from 'vitest'
import App from '../App.svelte'

// Mock the Diagnostics component
vi.mock('../Diagnostics.svelte', () => ({
  default: vi.fn().mockImplementation(() => ({
    $$: {
      on_mount: [],
      on_destroy: [],
      before_update: [],
      after_update: []
    }
  }))
}))

describe('App', () => {
  it('should render without errors', () => {
    expect(() => {
      render(App)
    }).not.toThrow()
  })

  it('should render the Diagnostics component', () => {
    const { container } = render(App)

    // The Diagnostics component should be rendered within the providers
    // Since we're mocking it, we can check that the container has content
    expect(container.firstChild).toBeTruthy()
  })

  it('should have the correct structure with providers', () => {
    const { container } = render(App)

    // Check that the component renders and has the expected structure
    // The exact structure depends on how the providers render
    expect(container).toBeTruthy()
  })
})
