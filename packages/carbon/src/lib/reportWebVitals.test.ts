import { reportWebVitals } from '$lib';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

// Set up spies
const onCLS = vi.fn();
const onINP = vi.fn();
const onFCP = vi.fn();
const onLCP = vi.fn();
const onTTFB = vi.fn();

// Set up modules
vi.mock('web-vitals', () => {
	return {
		onCLS,
		onINP,
		onFCP,
		onLCP,
		onTTFB
	};
});

describe('reportWebVitals', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	afterEach(() => {
		vi.restoreAllMocks();
		vi.resetModules();
	});

	it('registers handlers when provided', async () => {
		const handler = vi.fn();

		reportWebVitals(handler);

		await new Promise(requestAnimationFrame);

		expect(onCLS).toHaveBeenCalledWith(handler);
		expect(onINP).toHaveBeenCalledWith(handler);
		expect(onFCP).toHaveBeenCalledWith(handler);
		expect(onLCP).toHaveBeenCalledWith(handler);
		expect(onTTFB).toHaveBeenCalledWith(handler);
	});

	it('does nothing when no handler provided', async () => {
		reportWebVitals(undefined);

		await new Promise(requestAnimationFrame);

		expect(onCLS).not.toHaveBeenCalled();
		expect(onINP).not.toHaveBeenCalled();
		expect(onFCP).not.toHaveBeenCalled();
		expect(onLCP).not.toHaveBeenCalled();
		expect(onTTFB).not.toHaveBeenCalled();
	});
});
