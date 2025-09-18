// main.spec.ts
import { describe, expect, it, vi } from 'vitest'

vi.mock('vue', async (importOriginal: () => Promise<typeof import('vue')>) => {
  const actual = await importOriginal()
  return {
    ...actual,
    createApp: vi.fn(() => ({
      use: vi.fn().mockReturnThis(),
      mount: vi.fn().mockReturnThis(),
    })),
    defineComponent: vi.fn((options) => options),
  }
})
vi.mock('./App.vue', () => ({}))
vi.mock('./plugins/vuetify', () => ({}))
vi.mock('../reportWebVitals', () => {
  return {
    default: vi.fn(),
  }
})

import '../main'

describe('main.ts', () => {
  it('mounts the app and calls reportWebVitals', async () => {
    const { createApp } = await import('vue')
    const { default: reportWebVitals } = await import('../reportWebVitals')

    expect(createApp).toHaveBeenCalled()
    expect(reportWebVitals).toHaveBeenCalled()
  })
})
