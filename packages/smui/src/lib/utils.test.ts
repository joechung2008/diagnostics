import { describe, it, expect } from 'vitest';
import { isExtensionInfo, byKey, toNavLink } from './index';

describe('utils', () => {
	describe('isExtensionInfo', () => {
		it('should return true for valid ExtensionInfo', () => {
			const info: ExtensionInfo = { extensionName: 'foo' };
			expect(isExtensionInfo(info)).toBe(true);
		});

		it('should return false for undefined', () => {
			expect(isExtensionInfo(undefined)).toBe(false);
		});

		it('should return false for ExtensionError', () => {
			const error: ExtensionError = {
				lastError: { errorMessage: 'err', time: 'now' }
			};
			expect(isExtensionInfo(error)).toBe(false);
		});
	});

	describe('byKey', () => {
		it('should return negative when a.key < b.key', () => {
			const a: KeyedNavLink = { key: 'a', name: 'A' };
			const b: KeyedNavLink = { key: 'b', name: 'B' };
			expect(byKey(a, b)).toBeLessThan(0);
		});

		it('should return positive when a.key > b.key', () => {
			const a: KeyedNavLink = { key: 'b', name: 'B' };
			const b: KeyedNavLink = { key: 'a', name: 'A' };
			expect(byKey(a, b)).toBeGreaterThan(0);
		});

		it('should return zero when a.key === b.key', () => {
			const a: KeyedNavLink = { key: 'a', name: 'A' };
			const b: KeyedNavLink = { key: 'a', name: 'A' };
			expect(byKey(a, b)).toBe(0);
		});
	});

	describe('toNavLink', () => {
		it('should convert ExtensionInfo', () => {
			const info: ExtensionInfo = { extensionName: 'foo' };
			const navLink = toNavLink(info);
			expect(navLink).toMatchObject({ key: 'foo', name: 'foo', url: '' });
		});

		it('should set key from extensionName', () => {
			const info: ExtensionInfo = { extensionName: 'bar' };
			const navLink = toNavLink(info);
			expect(navLink.key).toBe('bar');
		});

		it('should set name from extensionName', () => {
			const info: ExtensionInfo = { extensionName: 'bar' };
			const navLink = toNavLink(info);
			expect(navLink.name).toBe('bar');
		});

		it('should set url to empty string', () => {
			const info: ExtensionInfo = { extensionName: 'bar' };
			const navLink = toNavLink(info);
			expect(navLink.url).toBe('');
		});
	});
});
