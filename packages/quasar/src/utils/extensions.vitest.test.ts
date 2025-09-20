import { describe, it, expect } from 'vitest';
import { isExtensionInfo, byKey, toNavLink, when } from './extensions';
import type { ExtensionInfo, ExtensionError, KeyedNavLink } from '../components/models';

describe('extensions utils', () => {
  describe('isExtensionInfo', () => {
    it('should return true for ExtensionInfo objects', () => {
      const extensionInfo: ExtensionInfo = {
        extensionName: 'test-extension',
        config: { key: 'value' },
        stageDefinition: { stage1: ['step1'] },
      };

      expect(isExtensionInfo(extensionInfo)).toBe(true);
    });

    it('should return true for ExtensionInfo objects without optional properties', () => {
      const extensionInfo: ExtensionInfo = {
        extensionName: 'test-extension',
      };

      expect(isExtensionInfo(extensionInfo)).toBe(true);
    });

    it('should return false for ExtensionError objects', () => {
      const extensionError: ExtensionError = {
        lastError: {
          errorMessage: 'Test error',
          time: '2023-01-01T00:00:00Z',
        },
      };

      expect(isExtensionInfo(extensionError)).toBe(false);
    });

    it('should return false for undefined', () => {
      expect(isExtensionInfo(undefined)).toBe(false);
    });
  });

  describe('byKey', () => {
    it('should return -1 when first key is alphabetically before second', () => {
      const a: KeyedNavLink = { key: 'apple', name: 'Apple' };
      const b: KeyedNavLink = { key: 'banana', name: 'Banana' };

      expect(byKey(a, b)).toBe(-1);
    });

    it('should return 1 when first key is alphabetically after second', () => {
      const a: KeyedNavLink = { key: 'banana', name: 'Banana' };
      const b: KeyedNavLink = { key: 'apple', name: 'Apple' };

      expect(byKey(a, b)).toBe(1);
    });

    it('should return 0 when keys are equal', () => {
      const a: KeyedNavLink = { key: 'apple', name: 'Apple' };
      const b: KeyedNavLink = { key: 'apple', name: 'Apple' };

      expect(byKey(a, b)).toBe(0);
    });
  });

  describe('toNavLink', () => {
    it('should transform ExtensionInfo to KeyedNavLink', () => {
      const extensionInfo: ExtensionInfo = {
        extensionName: 'test-extension',
        config: { key: 'value' },
      };

      const result = toNavLink(extensionInfo);

      expect(result).toEqual({
        key: 'test-extension',
        name: 'test-extension',
        url: '',
      });
    });
  });

  describe('when', () => {
    it('should return array when condition is true', () => {
      const result = when(true, 'item1', 'item2');

      expect(result).toEqual(['item1', 'item2']);
    });

    it('should return empty array when condition is false', () => {
      const result = when(false, 'item1', 'item2');

      expect(result).toEqual([]);
    });

    it('should work with different types', () => {
      const result = when(true, 1, 2, 3);

      expect(result).toEqual([1, 2, 3]);
    });
  });
});
