import { fireEvent, render } from '@testing-library/svelte'
import { describe, expect, it, vi } from 'vitest'
import Extensions from '../Extensions.svelte'
import type { Extension, ExtensionError, ExtensionInfo } from '../types'

describe('Extensions', () => {
  it('should render single extension info', () => {
    const extensions: Record<string, Extension> = {
      'test-ext': {
        extensionName: 'TestExtension'
      } as ExtensionInfo
    }

    const { container } = render(Extensions, {
      props: {
        extensions,
        onLinkClick: undefined
      }
    })

    expect(container).toMatchSnapshot()
  })

  it('should render multiple extension infos sorted alphabetically', () => {
    const extensions: Record<string, Extension> = {
      'zebra-ext': {
        extensionName: 'ZebraExtension'
      } as ExtensionInfo,
      'alpha-ext': {
        extensionName: 'AlphaExtension'
      } as ExtensionInfo,
      'beta-ext': {
        extensionName: 'BetaExtension'
      } as ExtensionInfo
    }

    const { container } = render(Extensions, {
      props: {
        extensions,
        onLinkClick: undefined
      }
    })

    expect(container).toMatchSnapshot()
  })

  it('should filter out extension errors and only show extension infos', () => {
    const extensions: Record<string, Extension> = {
      'good-ext': {
        extensionName: 'GoodExtension'
      } as ExtensionInfo,
      'bad-ext': {
        lastError: {
          errorMessage: 'Failed to load',
          time: '2025-09-13T12:00:00Z'
        }
      } as ExtensionError,
      'another-good-ext': {
        extensionName: 'AnotherGoodExtension'
      } as ExtensionInfo
    }

    const { container } = render(Extensions, {
      props: {
        extensions,
        onLinkClick: undefined
      }
    })

    expect(container).toMatchSnapshot()
  })

  it('should render extensions with full extension info including config and stage definition', () => {
    const extensions: Record<string, Extension> = {
      'full-ext': {
        extensionName: 'FullExtension',
        config: {
          setting1: 'value1',
          setting2: 'value2'
        },
        stageDefinition: {
          dev: ['localhost'],
          prod: ['production.com']
        }
      } as ExtensionInfo
    }

    const { container } = render(Extensions, {
      props: {
        extensions,
        onLinkClick: undefined
      }
    })

    expect(container).toMatchSnapshot()
  })

  it('should render empty extensions object', () => {
    const extensions: Record<string, Extension> = {}

    const { container } = render(Extensions, {
      props: {
        extensions,
        onLinkClick: undefined
      }
    })

    expect(container).toMatchSnapshot()
  })

  it('should render only extension errors (no visible links)', () => {
    const extensions: Record<string, Extension> = {
      error1: {
        lastError: {
          errorMessage: 'Extension failed',
          time: '2025-09-13T12:00:00Z'
        }
      } as ExtensionError,
      error2: {
        lastError: {
          errorMessage: 'Another failure',
          time: '2025-09-13T13:00:00Z'
        }
      } as ExtensionError
    }

    const { container } = render(Extensions, {
      props: {
        extensions,
        onLinkClick: undefined
      }
    })

    expect(container).toMatchSnapshot()
  })

  it('should handle extensions with special characters in names', () => {
    const extensions: Record<string, Extension> = {
      'special-ext': {
        extensionName: 'Special_Extension-v2.1.0'
      } as ExtensionInfo,
      'another-special': {
        extensionName: 'Another@Special#Extension'
      } as ExtensionInfo
    }

    const { container } = render(Extensions, {
      props: {
        extensions,
        onLinkClick: undefined
      }
    })

    expect(container).toMatchSnapshot()
  })

  it('should handle onLinkClick prop', () => {
    const mockOnLinkClick = vi.fn()
    const extensions: Record<string, Extension> = {
      'clickable-ext': {
        extensionName: 'ClickableExtension'
      } as ExtensionInfo
    }

    const { container, getByText } = render(Extensions, {
      props: {
        extensions,
        onLinkClick: mockOnLinkClick
      }
    })

    expect(container).toMatchSnapshot()

    // Test click functionality
    const button = getByText('ClickableExtension')
    fireEvent.click(button)

    expect(mockOnLinkClick).toHaveBeenCalledTimes(1)
    expect(mockOnLinkClick).toHaveBeenCalledWith(
      expect.any(Event),
      expect.objectContaining({
        key: 'ClickableExtension',
        name: 'ClickableExtension',
        url: 'ClickableExtension'
      })
    )
  })
})
