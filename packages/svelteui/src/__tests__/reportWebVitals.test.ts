import { describe, it, expect, vi } from 'vitest'
import reportWebVitals from '../reportWebVitals'

// Mock web-vitals module
vi.mock('web-vitals', () => ({
  onCLS: vi.fn(),
  onINP: vi.fn(),
  onFCP: vi.fn(),
  onLCP: vi.fn(),
  onTTFB: vi.fn()
}))

describe('reportWebVitals', () => {
  it('should not call web-vitals functions when onPerfEntry is not provided', async () => {
    const { onCLS, onINP, onFCP, onLCP, onTTFB } = await import('web-vitals')

    reportWebVitals()

    expect(onCLS).not.toHaveBeenCalled()
    expect(onINP).not.toHaveBeenCalled()
    expect(onFCP).not.toHaveBeenCalled()
    expect(onLCP).not.toHaveBeenCalled()
    expect(onTTFB).not.toHaveBeenCalled()
  })

  it('should call all web-vitals functions when onPerfEntry is a function', async () => {
    const { onCLS, onINP, onFCP, onLCP, onTTFB } = await import('web-vitals')
    const mockOnPerfEntry = vi.fn()

    reportWebVitals(mockOnPerfEntry)

    // Wait for the dynamic import to complete
    await new Promise(requestAnimationFrame)

    expect(onCLS).toHaveBeenCalledWith(mockOnPerfEntry)
    expect(onINP).toHaveBeenCalledWith(mockOnPerfEntry)
    expect(onFCP).toHaveBeenCalledWith(mockOnPerfEntry)
    expect(onLCP).toHaveBeenCalledWith(mockOnPerfEntry)
    expect(onTTFB).toHaveBeenCalledWith(mockOnPerfEntry)
  })
})
