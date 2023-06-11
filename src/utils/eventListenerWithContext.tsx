type EventListnerElement = HTMLElement | typeof window | typeof window.document;

export interface EventListenerContext {
  element: EventListnerElement;
  type: string;
  listener: (ev: Event) => void;
  remove: () => void;
}

export type EventListenerContextManager = ReturnType<
  typeof buildEventListenerContextManager
>;

export function buildEventListenerContextManager() {
  const contexts: EventListenerContext[] = [];

  function set(
    element: EventListnerElement,
    type: string,
    listener: (ev: Event) => void
  ) {
    element.addEventListener(type, listener);
    const ctx = {
      element,
      type,
      listener,
      remove: () => {
        remove(ctx);
      },
    };
    contexts.push(ctx);
    return ctx;
  }

  function remove(ctx: EventListenerContext) {
    const index = contexts.indexOf(ctx);
    if (index === -1) return;
    contexts.splice(index, 1);
    ctx.element.removeEventListener(ctx.type, ctx.listener);
  }

  function clear() {
    while (contexts.length > 0) {
      const ctx = contexts.pop();
      if (ctx === undefined) continue;
      ctx.element.removeEventListener(ctx.type, ctx.listener);
    }
  }

  return { set, remove, clear };
}
