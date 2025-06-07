// lib/hooks/usePrevious.ts
import { useEffect, useRef } from 'react';

/**
 * Persist the previous value of a variable between renders.
 *
 * @param value The value to track.
 * @returns The previous value.
 */
export function usePrevious<T>(value: T) {
  const ref = useRef<T>(undefined);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}