import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { reportWebVitals } from './index';

describe('reportWebVitals', () => {
	beforeEach(() => {
		vi.mock('web-vitals', () => ({
			onCLS: vi.fn(),
			onINP: vi.fn(),
			onFCP: vi.fn(),
			onLCP: vi.fn(),
			onTTFB: vi.fn()
		}));
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	it('should not call web-vitals handlers if no callback is provided', async () => {
		const callbacks = await import('web-vitals');
		reportWebVitals();

		await new Promise(requestAnimationFrame);

		for (const fn of Object.values(callbacks)) {
			expect(fn).not.toHaveBeenCalled();
		}
	});

	it('should call web-vitals handlers with the callback if provided', async () => {
		const cb = vi.fn();

		const callbacks = await import('web-vitals');
		reportWebVitals(cb);

		await new Promise(requestAnimationFrame);

		for (const fn of Object.values(callbacks)) {
			expect(fn).toHaveBeenCalledWith(cb);
		}
	});
});
