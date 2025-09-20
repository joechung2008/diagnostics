import { ref, type Ref } from 'vue';

export interface UseFetchReturn<T> {
  data: Ref<T | null>;
  pending: Ref<boolean>;
  error: Ref<Error | null>;
  refresh: () => Promise<void>;
}

export function useFetch<T>(url: string | (() => string)): UseFetchReturn<T> {
  const data: Ref<T | null> = ref(null);
  const pending = ref(false);
  const error = ref<Error | null>(null);

  const refresh = async () => {
    pending.value = true;
    error.value = null;

    try {
      const fetchUrl = typeof url === 'function' ? url() : url;
      const response = await fetch(fetchUrl);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      data.value = await response.json();
    } catch (err) {
      error.value = err instanceof Error ? err : new Error(String(err));
    } finally {
      pending.value = false;
    }
  };

  return {
    data,
    pending,
    error,
    refresh,
  };
}
