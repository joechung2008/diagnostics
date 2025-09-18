import { byKey, isExtensionInfo, toNavLink } from '$lib';
import { describe, expect, it } from 'vitest';

describe('utils', () => {
	describe('isExtensionInfo', () => {
		it('returns true for ExtensionInfo objects', () => {
			const value: ExtensionInfo = {
				extensionName: 'ext1',
				config: {
					a: 'b'
				}
			};
			expect(isExtensionInfo(value)).toBe(true);
		});

		it('returns false for ExtensionError objects', () => {
			const value: ExtensionError = {
				lastError: {
					errorMessage: 'oops',
					time: 'now'
				}
			};
			expect(isExtensionInfo(value)).toBe(false);
		});

		it('returns false for undefined', () => {
			expect(isExtensionInfo(undefined)).toBe(false);
		});
	});

	describe('byKey', () => {
		it('sorts by key ascending', () => {
			const a = { key: 'a', name: 'a' };
			const b = { key: 'b', name: 'b' };
			expect(byKey(a, b)).toBeLessThan(0);
			expect(byKey(b, a)).toBeGreaterThan(0);
			expect(byKey(a, a)).toBe(0);
		});
	});

	describe('toNavLink', () => {
		it('converts ExtensionInfo to KeyedNavLink', () => {
			const info = { extensionName: 'ext1' };
			const link = toNavLink(info);
			expect(link).toHaveProperty('key', 'ext1');
			expect(link).toHaveProperty('name', 'ext1');
			expect(link).toHaveProperty('url', '');
		});
	});
});
