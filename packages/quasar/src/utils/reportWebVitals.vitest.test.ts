import { afterEach, beforeEach, describe, it, expect, vi } from 'vitest';
import reportWebVitals from './reportWebVitals';

describe('reportWebVitals', () => {
  beforeEach(() => {
    vi.doMock('web-vitals', () => ({
      onCLS: vi.fn(),
      onINP: vi.fn(),
      onFCP: vi.fn(),
      onLCP: vi.fn(),
      onTTFB: vi.fn(),
    }));
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.resetModules();
  });

  it('should do nothing when not provided with a function', async () => {
    const { onCLS, onINP, onFCP, onLCP, onTTFB } = await import('web-vitals');

    await reportWebVitals();

    await new Promise(requestAnimationFrame);

    expect(onCLS).not.toHaveBeenCalled();
    expect(onINP).not.toHaveBeenCalled();
    expect(onFCP).not.toHaveBeenCalled();
    expect(onLCP).not.toHaveBeenCalled();
    expect(onTTFB).not.toHaveBeenCalled();
  });

  it('should call the handler when provided with a function', async () => {
    const mockHandler = vi.fn();

    const { onCLS, onINP, onFCP, onLCP, onTTFB } = await import('web-vitals');

    await reportWebVitals(mockHandler);

    await new Promise(requestAnimationFrame);

    expect(onCLS).toHaveBeenCalled();
    expect(onINP).toHaveBeenCalled();
    expect(onFCP).toHaveBeenCalled();
    expect(onLCP).toHaveBeenCalled();
    expect(onTTFB).toHaveBeenCalled();
  });
});
