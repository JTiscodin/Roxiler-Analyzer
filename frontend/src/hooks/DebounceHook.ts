import { useRef, useEffect, useMemo } from "react";

// Define a generic type for the function to be debounced
type DebouncedFunction = (...args: unknown[]) => void;

export const useDebounce = <T extends DebouncedFunction>(fn: T, delay: number): T => {
  const ref = useRef<T>();

  useEffect(() => {
    ref.current = fn;
  }, [fn]);

  const debounce = (func: T, duration: number): T => {
    let timeoutId: NodeJS.Timeout | null = null;
    
    return ((...args: Parameters<T>) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => func(...args), duration);
    }) as T;
  };

  const debouncedCallback = useMemo(() => {
    const func = (...args: Parameters<T>) => {
      ref.current?.(...args);
    };
    return debounce(func as T, delay);
  }, [delay])

  return debouncedCallback;
};
