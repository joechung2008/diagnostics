import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useFetch } from './useFetch';

// Mock fetch globally
const fetchMock = vi.fn();
global.fetch = fetchMock;

describe('useFetch', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return the correct interface', () => {
    const result = useFetch('/api/test');

    expect(result).toHaveProperty('data');
    expect(result).toHaveProperty('pending');
    expect(result).toHaveProperty('error');
    expect(result).toHaveProperty('refresh');
    expect(typeof result.refresh).toBe('function');
  });

  it('should initialize with correct default values', () => {
    const result = useFetch('/api/test');

    expect(result.data.value).toBeNull();
    expect(result.pending.value).toBe(false);
    expect(result.error.value).toBeNull();
  });

  it('should handle successful fetch with string URL', async () => {
    const mockData = { message: 'success' };
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockData),
    });

    const result = useFetch('/api/test');
    await result.refresh();

    expect(fetchMock).toHaveBeenCalledWith('/api/test');
    expect(result.data.value).toEqual(mockData);
    expect(result.pending.value).toBe(false);
    expect(result.error.value).toBeNull();
  });

  it('should handle successful fetch with function URL', async () => {
    const mockData = { items: [1, 2, 3] };
    const urlFunction = vi.fn(() => '/api/dynamic');
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockData),
    });

    const result = useFetch(urlFunction);
    await result.refresh();

    expect(urlFunction).toHaveBeenCalled();
    expect(fetchMock).toHaveBeenCalledWith('/api/dynamic');
    expect(result.data.value).toEqual(mockData);
  });

  it('should handle HTTP error responses', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: false,
      status: 404,
    });

    const result = useFetch('/api/not-found');
    await result.refresh();

    expect(result.data.value).toBeNull();
    expect(result.pending.value).toBe(false);
    expect(result.error.value).toBeInstanceOf(Error);
    expect(result.error.value?.message).toBe('HTTP error! status: 404');
  });

  it('should handle network errors', async () => {
    const networkError = new Error('Network failure');
    fetchMock.mockRejectedValueOnce(networkError);

    const result = useFetch('/api/fail');
    await result.refresh();

    expect(result.data.value).toBeNull();
    expect(result.pending.value).toBe(false);
    expect(result.error.value).toBe(networkError);
  });

  it('should handle non-Error exceptions', async () => {
    fetchMock.mockRejectedValueOnce('string error');

    const result = useFetch('/api/fail');
    await result.refresh();

    expect(result.data.value).toBeNull();
    expect(result.pending.value).toBe(false);
    expect(result.error.value).toBeInstanceOf(Error);
    expect(result.error.value?.message).toBe('string error');
  });

  it('should set pending to true during request', async () => {
    let resolvePromise: ((value: unknown) => void) | undefined;

    const pendingPromise = new Promise((resolve) => {
      resolvePromise = resolve;
    });

    fetchMock.mockImplementationOnce(() =>
      pendingPromise.then(() => ({
        ok: true,
        json: () => Promise.resolve({}),
      })),
    );

    const result = useFetch('/api/slow');

    // Start the request
    const refreshPromise = result.refresh();

    // Should be pending immediately
    expect(result.pending.value).toBe(true);

    // Resolve the fetch
    resolvePromise?.({
      ok: true,
      json: () => Promise.resolve({}),
    });

    await refreshPromise;

    expect(result.pending.value).toBe(false);
  });

  it('should reset error on new request', async () => {
    // First request fails
    fetchMock.mockResolvedValueOnce({
      ok: false,
      status: 500,
    });

    const result = useFetch('/api/fail');
    await result.refresh();

    expect(result.error.value).toBeInstanceOf(Error);

    // Second request succeeds
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ success: true }),
    });

    await result.refresh();

    expect(result.error.value).toBeNull();
    expect(result.data.value).toEqual({ success: true });
  });
});
