import { describe, expect, it } from 'vitest'
import { byKey, isExtensionInfo, toNavLink } from '../utils'

describe('utils', () => {
  describe('isExtensionInfo', () => {
    it('should return true for ExtensionInfo objects', () => {
      const extensionInfo = { extensionName: 'test-extension' }
      expect(isExtensionInfo(extensionInfo)).toBe(true)
    })

    it('should return false for undefined', () => {
      expect(isExtensionInfo(undefined)).toBe(false)
    })

    it('should return false for ExtensionError objects', () => {
      const extensionError = {
        lastError: { errorMessage: 'error', time: 'now' }
      }
      expect(isExtensionInfo(extensionError)).toBe(false)
    })
  })

  describe('byKey', () => {
    it('should return -1 when first key is less than second', () => {
      const a = { key: 'a', name: 'A', url: '' }
      const b = { key: 'b', name: 'B', url: '' }
      expect(byKey(a, b)).toBe(-1)
    })

    it('should return 1 when first key is greater than second', () => {
      const a = { key: 'b', name: 'B', url: '' }
      const b = { key: 'a', name: 'A', url: '' }
      expect(byKey(a, b)).toBe(1)
    })

    it('should return 0 when keys are equal', () => {
      const a = { key: 'a', name: 'A', url: '' }
      const b = { key: 'a', name: 'A', url: '' }
      expect(byKey(a, b)).toBe(0)
    })
  })

  describe('toNavLink', () => {
    it('should convert ExtensionInfo to KeyedNavLink', () => {
      const extensionInfo = { extensionName: 'test-extension' }
      const result = toNavLink(extensionInfo)
      expect(result).toEqual({
        key: 'test-extension',
        name: 'test-extension',
        url: ''
      })
    })
  })
})
