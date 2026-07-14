import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Generic data-fetching hook.
 *
 * @param {Function} fetchFn  An async function that returns data.
 * @param {*[]} deps          Dependencies that trigger a re-fetch.
 * @param {{ immediate?: boolean }} options
 *
 * @returns {{ data, loading, error, refetch }}
 *
 * @example
 * const { data, loading } = useFetch(() => newsService.getAll({ page, limit }), [page]);
 */
const useFetch = (fetchFn, deps = [], { immediate = true } = {}) => {
  const [data,    setData]    = useState(null);
  const [loading, setLoading] = useState(immediate);
  const [error,   setError]   = useState(null);
  const abortRef              = useRef(null);

  const execute = useCallback(async () => {
    // Abort any in-flight request
    if (abortRef.current) abortRef.current.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setLoading(true);
    setError(null);

    try {
      const result = await fetchFn(controller.signal);
      if (!controller.signal.aborted) {
        setData(result);
      }
    } catch (err) {
      if (!controller.signal.aborted) {
        setError(err.message || 'Failed to fetch data.');
      }
    } finally {
      if (!controller.signal.aborted) {
        setLoading(false);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEffect(() => {
    if (immediate) execute();
    return () => abortRef.current?.abort();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [execute]);

  return { data, loading, error, refetch: execute };
};

export default useFetch;
