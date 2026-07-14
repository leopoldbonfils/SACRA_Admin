import { useState, useEffect } from 'react';

/**
 * Debounce a rapidly-changing value.
 *
 * @param {*}      value  The value to debounce.
 * @param {number} delay  Delay in milliseconds (default 400ms).
 * @returns {*}  The debounced value.
 *
 * @example
 * const debouncedSearch = useDebounce(searchTerm, 400);
 * useEffect(() => { fetchResults(debouncedSearch); }, [debouncedSearch]);
 */
const useDebounce = (value, delay = 400) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
