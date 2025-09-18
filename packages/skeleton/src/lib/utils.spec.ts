import { describe, it, expect } from 'vitest';
import { isExtensionInfo, byKey, toNavLink } from '$lib';

describe('utils', () => {
	describe('isExtensionInfo', () => {
		it('returns true for ExtensionInfo-like objects', () => {
			const value = { extensionName: 'ext1' } as ExtensionInfo;
			expect(isExtensionInfo(value)).toBe(true);
		});

		it('returns false for undefined', () => {
			expect(isExtensionInfo(undefined)).toBe(false);
		});

		it('returns false for ExtensionError objects', () => {
			const err = {
				lastError: { errorMessage: 'oh no', time: 'now' }
			} as ExtensionError;
			expect(isExtensionInfo(err)).toBe(false);
		});
	});

	describe('byKey', () => {
		it('returns -1 when first key is smaller', () => {
			const a = { key: 'a' } as KeyedNavLink;
			const b = { key: 'b' } as KeyedNavLink;
			expect(byKey(a, b)).toBe(-1);
		});

		it('returns 1 when first key is larger', () => {
			const a = { key: 'a' } as KeyedNavLink;
			const b = { key: 'b' } as KeyedNavLink;
			expect(byKey(b, a)).toBe(1);
		});

		it('returns 0 when keys are equal', () => {
			const a = { key: 'a' } as KeyedNavLink;
			expect(byKey(a, a)).toBe(0);
		});
	});

	describe('toNavLink', () => {
		it('maps ExtensionInfo to KeyedNavLink', () => {
			const ext = { extensionName: 'ext-xyz' } as ExtensionInfo;
			const nav = toNavLink(ext);
			expect(nav).toEqual({ key: 'ext-xyz', name: 'ext-xyz', url: '' });
		});
	});
});
