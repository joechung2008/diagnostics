import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import reportWebVitals from './reportWebVitals';

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
		vi.resetAllMocks();
	});

	it('should call web-vitals handlers with the callback if provided', async () => {
		const callback = vi.fn();
		const callbacks = await import('web-vitals');

		reportWebVitals(callback);

		await new Promise(requestAnimationFrame);

		for (const fn of Object.values(callbacks)) {
			expect(fn).toHaveBeenCalledWith(callback);
		}
	});

	it('should not call web-vitals handlers if no callback is provided', async () => {
		const callbacks = await import('web-vitals');

		reportWebVitals();

		await new Promise(requestAnimationFrame);

		for (const fn of Object.values(callbacks)) {
			expect(fn).not.toHaveBeenCalled();
		}
	});
});
