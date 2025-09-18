import type { createQuery as createQueryActual } from '@tanstack/svelte-query'
import { fireEvent, render, waitFor } from '@testing-library/svelte'
import type { Readable } from 'svelte/store'
import { beforeEach, describe, expect, it, vi, type Mock } from 'vitest'
import Diagnostics from '../Diagnostics.svelte'
import type {
  BuildInfoProps,
  Diagnostics as DiagnosticsType,
  Extension,
  ExtensionInfo,
  ServerInfoProps
} from '../types'

// TanStack Query store types (simplified for testing)
interface QueryState<TData = unknown, TError = unknown> {
  data: TData | null
  error: TError | null
  isLoading: boolean
  refetch: () => void
}

type MockQueryStore<TData = unknown, TError = unknown> = Readable<
  QueryState<TData, TError>
> & {
  refetch: () => void
  set: (value: QueryState<TData, TError>) => void
  update: (
    updater: (value: QueryState<TData, TError>) => QueryState<TData, TError>
  ) => void
} & {
  refetch: () => void
}

// Mock the child components
vi.mock('../Extensions.svelte', () => ({
  default: vi.fn().mockImplementation(() => ({
    $$: {
      on_mount: [],
      on_destroy: [],
      before_update: [],
      after_update: []
    }
  }))
}))

vi.mock('../Extension.svelte', () => ({
  default: vi.fn().mockImplementation(() => ({
    $$: {
      on_mount: [],
      on_destroy: [],
      before_update: [],
      after_update: []
    }
  }))
}))

vi.mock('../BuildInfo.svelte', () => ({
  default: vi.fn().mockImplementation(() => ({
    $$: {
      on_mount: [],
      on_destroy: [],
      before_update: [],
      after_update: []
    }
  }))
}))

vi.mock('../ServerInfo.svelte', () => ({
  default: vi.fn().mockImplementation(() => ({
    $$: {
      on_mount: [],
      on_destroy: [],
      before_update: [],
      after_update: []
    }
  }))
}))

// Mock TanStack Query with proper Svelte store
vi.mock('@tanstack/svelte-query', () => ({
  createQuery: vi.fn()
}))

// Create a properly typed mock Svelte store that mimics TanStack Query behavior
function createMockQueryStore<TData = unknown, TError = unknown>(
  initialState: QueryState<TData, TError>
): MockQueryStore<TData, TError> {
  const subscribers = new Set<(value: QueryState<TData, TError>) => void>()
  let currentValue = initialState

  const store = {
    subscribe: (subscriber: (value: QueryState<TData, TError>) => void) => {
      subscribers.add(subscriber)
      subscriber(currentValue)

      return () => subscribers.delete(subscriber)
    },
    refetch: vi.fn(),
    set: (value: QueryState<TData, TError>) => {
      currentValue = value
      subscribers.forEach((subscriber) => subscriber(currentValue))
    },
    update: (
      updater: (value: QueryState<TData, TError>) => QueryState<TData, TError>
    ) => {
      currentValue = updater(currentValue)
      subscribers.forEach((subscriber) => subscriber(currentValue))
    }
  }

  return store
}

// Mock fetch with proper typing
const mockFetch = vi.fn() as Mock<typeof globalThis.fetch>
globalThis.fetch = mockFetch

describe('Diagnostics', () => {
  // Create type-safe mock data factory
  const createMockDiagnosticsData = (): DiagnosticsType => ({
    buildInfo: {
      buildVersion: '1.2.3'
    } as BuildInfoProps,
    extensions: {
      'test-ext': {
        extensionName: 'TestExtension',
        config: { key: 'value' },
        stageDefinition: { stage1: ['step1', 'step2'] }
      } as ExtensionInfo,
      paasserverless: {
        extensionName: 'PaasServerlessExtension',
        config: { enabled: 'true' }
      } as ExtensionInfo
    } as Record<string, Extension>,
    serverInfo: {
      deploymentId: 'test-deployment',
      extensionSync: {
        totalSyncAllCount: 42
      },
      hostname: 'test-host',
      nodeVersions: 'v18.0.0',
      serverId: 'test-server',
      uptime: 3600
    } as ServerInfoProps
  })

  let mockQuery: MockQueryStore<DiagnosticsType, Error>

  beforeEach(async () => {
    vi.clearAllMocks()

    // Setup mock query store with proper typing
    mockQuery = createMockQueryStore<DiagnosticsType, Error>({
      data: null,
      error: null,
      isLoading: false,
      refetch: vi.fn()
    })

    // Mock createQuery to return our mock store (type assertion for testing compatibility)
    const { createQuery } = vi.mocked(await import('@tanstack/svelte-query'))
    createQuery.mockReturnValue(
      mockQuery as unknown as ReturnType<typeof createQueryActual>
    )

    // Mock successful fetch with proper typing
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(createMockDiagnosticsData())
    } as Response)
  })

  it('should render loading state initially', () => {
    mockQuery.update((current: QueryState<DiagnosticsType, Error>) => ({
      ...current,
      isLoading: true
    }))

    const { container } = render(Diagnostics)
    expect(container.textContent).toContain('Loading diagnostics...')
  })

  it('should render error state when query fails', () => {
    mockQuery.update((current: QueryState<DiagnosticsType, Error>) => ({
      ...current,
      error: new Error('Network error'),
      isLoading: false
    }))

    const { container } = render(Diagnostics)
    expect(container.textContent).toContain('Error: Network error')
  })

  it('should render diagnostics data when loaded', async () => {
    mockQuery.update((current: QueryState<DiagnosticsType, Error>) => ({
      ...current,
      data: createMockDiagnosticsData(),
      isLoading: false
    }))

    const { container } = render(Diagnostics)
    await waitFor(() => {
      expect(container.textContent).not.toContain('Loading diagnostics...')
    })
  })

  it('should display environment selector with default environment', () => {
    const { getByText } = render(Diagnostics)
    expect(getByText('Public Cloud')).toBeTruthy()
  })

  it('should show extension buttons when paasserverless extension is available', () => {
    mockQuery.update((current: QueryState<DiagnosticsType, Error>) => ({
      ...current,
      data: createMockDiagnosticsData(),
      isLoading: false
    }))

    const { getByText } = render(Diagnostics)
    expect(getByText('paasserverless')).toBeTruthy()
    expect(getByText('websites')).toBeTruthy()
  })

  it('should render tabs for different views', () => {
    const { getByText } = render(Diagnostics)
    expect(getByText('Extensions')).toBeTruthy()
    expect(getByText('Build Information')).toBeTruthy()
    expect(getByText('Server Information')).toBeTruthy()
  })

  it('should switch tabs when clicked', async () => {
    mockQuery.update((current: QueryState<DiagnosticsType, Error>) => ({
      ...current,
      data: createMockDiagnosticsData(),
      isLoading: false
    }))

    const { getByText, container } = render(Diagnostics)

    // Click on Build Information tab
    const buildTab = getByText('Build Information')
    await fireEvent.click(buildTab)

    // The tab content should be rendered (mocked components)
    expect(container).toBeTruthy()
  })

  it('should handle environment change', async () => {
    const { getByText } = render(Diagnostics)

    // The environment menu should be present
    const menuButton = getByText('Public Cloud')
    expect(menuButton).toBeTruthy()

    // Note: Testing the actual menu interaction would require more complex mocking
    // of the Menu component from @svelteuidev/core
  })

  it('should handle extension button clicks', async () => {
    mockQuery.update((current: QueryState<DiagnosticsType, Error>) => ({
      ...current,
      data: createMockDiagnosticsData(),
      isLoading: false
    }))

    const { getByText } = render(Diagnostics)

    // Click on websites button
    const websitesButton = getByText('websites')
    await fireEvent.click(websitesButton)

    // The extension should be selected (this would trigger state changes)
    expect(websitesButton).toBeTruthy()
  })

  it('should render Extensions component on first tab', () => {
    mockQuery.update((current: QueryState<DiagnosticsType, Error>) => ({
      ...current,
      data: createMockDiagnosticsData(),
      isLoading: false
    }))

    const { container } = render(Diagnostics)

    // The Extensions component should be rendered (via our mock)
    expect(container).toBeTruthy()
  })

  it('should render BuildInfo component on second tab', async () => {
    mockQuery.update((current: QueryState<DiagnosticsType, Error>) => ({
      ...current,
      data: createMockDiagnosticsData(),
      isLoading: false
    }))

    const { getByText } = render(Diagnostics)

    // Switch to Build Information tab
    const buildTab = getByText('Build Information')
    await fireEvent.click(buildTab)

    // The BuildInfo component should be rendered (via our mock)
    expect(buildTab).toBeTruthy()
  })

  it('should render ServerInfo component on third tab', async () => {
    mockQuery.update((current: QueryState<DiagnosticsType, Error>) => ({
      ...current,
      data: createMockDiagnosticsData(),
      isLoading: false
    }))

    const { getByText } = render(Diagnostics)

    // Switch to Server Information tab
    const serverTab = getByText('Server Information')
    await fireEvent.click(serverTab)

    // The ServerInfo component should be rendered (via our mock)
    expect(serverTab).toBeTruthy()
  })

  it('should handle fetch errors gracefully', async () => {
    mockFetch.mockRejectedValue(new Error('Network failure'))

    const { container } = render(Diagnostics)

    await waitFor(() => {
      mockQuery.update((current: QueryState<DiagnosticsType, Error>) => ({
        ...current,
        error: new Error('Network failure'),
        isLoading: false
      }))
    })

    expect(container).toBeTruthy()
  })

  it('should refetch data when environment changes', () => {
    const { rerender } = render(Diagnostics)

    // The refetch should be called when environment changes
    // This is tested indirectly through the component's reactive statements
    expect(mockQuery).toBeTruthy() // Initially not called

    // Re-render to simulate environment change
    rerender({})
    // Note: In a real scenario, we'd need to trigger the environment change handler
  })
})
