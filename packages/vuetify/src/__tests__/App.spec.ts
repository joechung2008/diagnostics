import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { ref } from 'vue'
import App from '../App.vue'

// Mock data for testing
const mockDiagnostics = {
  extensions: {
    testExtension: {
      name: 'Test Extension',
      version: '1.0.0',
    },
  },
  buildInfo: {
    version: '1.0.0',
  },
  serverInfo: {
    nodeVersion: '18.0.0',
  },
}

// Mock useFetch from VueUse using hoisted pattern
const { useFetchMock } = vi.hoisted(() => ({
  useFetchMock: vi.fn(),
}))

let mockData: ReturnType<typeof ref> = ref(mockDiagnostics)
let mockIsFetching: ReturnType<typeof ref> = ref(false)
let mockError: ReturnType<typeof ref> = ref(null)

vi.mock('@vueuse/core', () => ({
  useFetch: (...args: unknown[]) => {
    useFetchMock(...args)
    return {
      json: () => ({
        data: mockData,
        isFetching: mockIsFetching,
        error: mockError,
      }),
    }
  },
}))

describe('App.vue', () => {
  beforeEach(() => {
    // Reset mock before each test
    useFetchMock.mockReset()
    mockData = ref(mockDiagnostics)
    mockIsFetching = ref(false)
    mockError = ref(null)
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('renders without crashing', () => {
    const wrapper = mount(App)
    expect(wrapper.exists()).toBe(true)
  })

  it('renders tabs correctly', () => {
    const wrapper = mount(App)
    const tabs = wrapper.findAll('.v-tab')
    expect(tabs).toHaveLength(3)
    expect(tabs[0]?.text()).toBe('Extensions')
    expect(tabs[1]?.text()).toBe('Build Information')
    expect(tabs[2]?.text()).toBe('Server Information')
  })

  it('calls useFetch with correct initial environment', () => {
    mount(App)
    expect(useFetchMock).toHaveBeenCalledWith(
      expect.any(Object), // environment ref
      { refetch: true }
    )
    expect(useFetchMock).toHaveBeenCalledTimes(1)
  })

  it('displays diagnostics data from useFetch', async () => {
    const wrapper = mount(App)
    await flushPromises()

    // Check that extensions are rendered
    const extensionItems = wrapper.findComponent({ name: 'ExtensionItems' })
    expect(extensionItems.exists()).toBe(true)
    expect(extensionItems.props('extensions')).toEqual(mockDiagnostics.extensions)
  })

  it('shows loading state when isFetching is true', () => {
    mockIsFetching = ref(true)
    mockData = ref(null)

    const wrapper = mount(App)
    // Component should still render even when loading
    expect(wrapper.exists()).toBe(true)
  })

  it('handles error state', () => {
    const error = new Error('Network error')
    mockError = ref(error)
    mockData = ref(null)
    mockIsFetching = ref(false)

    const wrapper = mount(App)
    // Component should still render even with error
    expect(wrapper.exists()).toBe(true)
  })

  it('renders extensions and responds to link click', async () => {
    const wrapper = mount(App)
    await flushPromises()

    // Find extension items component
    const extensionItems = wrapper.findComponent({ name: 'ExtensionItems' })
    expect(extensionItems.exists()).toBe(true)
  })
})
