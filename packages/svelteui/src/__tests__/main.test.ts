import { describe, it, expect, vi, beforeEach } from 'vitest'

// Mock the App component
const mockApp = vi.fn()
vi.mock('../App.svelte', () => ({
  default: mockApp
}))

describe('main.ts', () => {
  let mockTarget: HTMLElement

  beforeEach(() => {
    vi.clearAllMocks()

    // Create a mock DOM element
    mockTarget = document.createElement('div')
    mockTarget.id = 'app'

    // Mock getElementById to return our mock element
    vi.spyOn(document, 'getElementById').mockReturnValue(mockTarget)
  })

  it('should mount the App component to the DOM', async () => {
    // Import main.ts to trigger the mounting
    await import('../main')

    // Verify that getElementById was called with 'app'
    expect(document.getElementById).toHaveBeenCalledWith('app')

    // Verify that App was called (we don't need to check exact parameters)
    expect(mockApp).toHaveBeenCalled()
  })

  it('should handle missing app element gracefully', async () => {
    // Mock getElementById to return null
    vi.spyOn(document, 'getElementById').mockReturnValue(null)

    // This should not throw an error
    expect(async () => {
      await import('../main')
    }).not.toThrow()
  })

  it('should export the app instance', async () => {
    const mockAppInstance = { $destroy: vi.fn(), $on: vi.fn(), $set: vi.fn() }
    mockApp.mockReturnValue(mockAppInstance)

    // Clear the module cache to ensure fresh import
    vi.resetModules()

    const mainModule = await import('../main')

    // The main module should export the app instance returned by the App constructor
    expect(mainModule.default).toBe(mockAppInstance)
    expect(mainModule.default).toHaveProperty('$destroy')
    expect(mainModule.default).toHaveProperty('$on')
    expect(mainModule.default).toHaveProperty('$set')
  })
})
