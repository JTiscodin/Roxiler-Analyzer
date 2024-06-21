import { useRef, useEffect, useMemo } from "react";

export const useDebounce = (fn, delay: number) => {
  const ref = useRef();

  useEffect(() => {
    ref.current = fn;
  }, [fn]);

  const debounce = (fn, duration: number) => {
    let timelimit: any;
    return function (...args: any[]) {
      if (!timelimit) {
        return (timelimit = setTimeout(() => fn(...args), duration));
      } else {
        clearTimeout(timelimit);
        return (timelimit = setTimeout(() => fn(...args), duration));
      }
    };
  };

  const debouncedCallback = useMemo(() => {
    const func = () => {
      ref.current?.();
    };
    //We don't directly return debounce( ref.current?.(), delay) instead of the value down below, because if during the delay the value of ref.current changes, then we can see bugs, or unexpected things.
    return debounce(func, delay);
  }, []);

  return debouncedCallback;
};
