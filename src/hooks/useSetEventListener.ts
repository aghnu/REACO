import { useRef, useCallback, useEffect } from 'react';

interface EventListenerContext {
  element: HTMLElement;
  type: string;
  listener: (ev: Event) => void;
}

function useSetEventListener() {
  const contexts = useRef<EventListenerContext[]>([]);

  const setEventListener = useCallback(
    (element: HTMLElement, type: string, listener: (ev: Event) => void) => {
      element.addEventListener(type, listener);
      contexts.current.push({ element, type, listener });
    },
    []
  );

  const cleanEventListener = useCallback(() => {
    while (contexts.current.length !== 0) {
      const ctx = contexts.current.pop();
      if (ctx === undefined) continue;
      ctx.element.removeEventListener(ctx.type, ctx.listener);
    }
  }, []);

  useEffect(
    () => () => {
      cleanEventListener();
    },
    [cleanEventListener]
  );

  return { setEventListener, cleanEventListener };
}

export default useSetEventListener;
