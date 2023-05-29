import { useCallback, useEffect, useMemo } from 'react';
import { atom, useSetAtom } from 'jotai';
import useSetEventListener from './useSetEventListener';

function helperAddPointerEvents(
  element: HTMLElement,
  setEventListener: ReturnType<typeof useSetEventListener>['setEventListener'],
  cleanEventListener: ReturnType<
    typeof useSetEventListener
  >['cleanEventListener'],
  handlerUp: () => void,
  handlerDown: () => void,
  handlerHoverOn: () => void,
  handlerHoverOff: () => void
) {
  // state
  let keyPressed = false;
  let touchEvent = false;
  let continueTypingCheckingTimeout: number;
  let continueTypingInterval: number;

  const handlerUpDecorated = () => {
    window.clearTimeout(continueTypingCheckingTimeout);
    window.clearInterval(continueTypingInterval);
    if (!keyPressed) return;
    keyPressed = false;
    handlerUp();
  };
  const handlerDownDecorated = () => {
    window.clearTimeout(continueTypingCheckingTimeout);
    window.clearInterval(continueTypingInterval);
    if (keyPressed) return;
    keyPressed = true;
    handlerDown();

    // continue typing
    continueTypingCheckingTimeout = window.setTimeout(() => {
      if (keyPressed) {
        continueTypingInterval = window.setInterval(() => {
          handlerUp();
        }, 30);
      }
    }, 500);
  };
  const handlerUpDecoratedTouch = () => {
    touchEvent = true;
    handlerUpDecorated();
  };
  const handlerDownDecoratedTouch = () => {
    touchEvent = true;
    handlerDownDecorated();
  };
  const handlerUpDecoratedMouse = (e: Event) => {
    if (touchEvent) return;
    e.preventDefault();
    handlerUpDecorated();
  };
  const handlerDownDecoratedMouse = (e: Event) => {
    if (touchEvent) return;
    e.preventDefault();
    handlerDownDecorated();
  };
  const handlerUpDecoratedGlobal = () => {
    if (touchEvent) {
      touchEvent = false;
      return;
    }
    handlerUpDecorated();
  };

  // setup listners
  // touch
  setEventListener(element, 'touchstart', handlerDownDecoratedTouch);
  setEventListener(element, 'touchend', handlerUpDecoratedTouch);
  setEventListener(element, 'touchcancel', handlerUpDecoratedTouch);

  // mouse
  setEventListener(element, 'mouseup', handlerUpDecoratedMouse);
  setEventListener(element, 'mousedown', handlerDownDecoratedMouse);

  // global up
  setEventListener(document.body, 'mouseup', handlerUpDecoratedGlobal);

  // mouse hover
  setEventListener(element, 'mouseenter', handlerHoverOn);
  setEventListener(element, 'mouseleave', handlerHoverOff);

  return () => {
    window.clearTimeout(continueTypingCheckingTimeout);
    window.clearInterval(continueTypingInterval);
    cleanEventListener();
  };
}

function usePointerClick(
  htmlEl: HTMLElement | null,
  onPointerClick?: () => void
) {
  const { setEventListener, cleanEventListener } = useSetEventListener();
  const pointerDownAtom = useMemo(() => atom(false), []);
  const pointerHoverAtom = useMemo(() => atom(false), []);
  const setPointerDownAtom = useSetAtom(pointerDownAtom);
  const setPointerHoverAtom = useSetAtom(pointerHoverAtom);

  const handlePointerDown = useCallback(() => {
    setPointerDownAtom(true);
  }, [setPointerDownAtom]);
  const handlePointerUp = useCallback(() => {
    setPointerDownAtom(false);
    if (onPointerClick !== undefined) onPointerClick();
  }, [onPointerClick, setPointerDownAtom]);
  const handlePointerHoverOn = useCallback(() => {
    setPointerHoverAtom(true);
  }, [setPointerHoverAtom]);
  const handlePointerHoverOff = useCallback(() => {
    setPointerHoverAtom(false);
  }, [setPointerHoverAtom]);

  // every render
  useEffect(() => {
    if (htmlEl === null) return;
    const element = htmlEl;
    const clean = helperAddPointerEvents(
      element,
      setEventListener,
      cleanEventListener,
      handlePointerUp,
      handlePointerDown,
      handlePointerHoverOn,
      handlePointerHoverOff
    );
    return () => {
      clean();
    };
  }, [
    htmlEl,
    setEventListener,
    cleanEventListener,
    handlePointerDown,
    handlePointerHoverOff,
    handlePointerHoverOn,
    handlePointerUp,
  ]);

  return { pointerDownAtom, pointerHoverAtom };
}

export default usePointerClick;
