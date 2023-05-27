import { useCallback, useEffect, useRef, useMemo } from 'react';
import { atom, useSetAtom } from 'jotai';

function helperAddPointerEvents(
  element: HTMLElement,
  handlerUp: () => void,
  handlerDown: () => void,
  handlerHoverOn: () => void,
  handlerHoverOff: () => void
) {
  element.addEventListener('touchstart', handlerUp);
  element.addEventListener('mouseup', handlerUp);
  document.body.addEventListener('mouseup', handlerUp);

  element.addEventListener('touchend', handlerDown);
  element.addEventListener('touchcancel', handlerDown);
  element.addEventListener('mousedown', handlerDown);

  element.addEventListener('mouseenter', handlerHoverOn);
  element.addEventListener('mouseleave', handlerHoverOff);
}

function helperRemovePointerEvents(
  element: HTMLElement,
  handlerUp: () => void,
  handlerDown: () => void,
  handlerHoverOn: () => void,
  handlerHoverOff: () => void
) {
  element.removeEventListener('touchstart', handlerUp);
  element.removeEventListener('mouseup', handlerUp);
  document.body.removeEventListener('mouseup', handlerUp);

  element.removeEventListener('touchend', handlerDown);
  element.removeEventListener('touchcancel', handlerDown);
  element.removeEventListener('mousedown', handlerDown);

  element.removeEventListener('mouseenter', handlerHoverOn);
  element.removeEventListener('mouseleave', handlerHoverOff);
}

function usePointerClick(
  htmlEl: HTMLElement | null,
  onPointerClick?: () => void
) {
  const pointerDown = useRef(false);

  const pointerDownAtom = useMemo(() => atom(false), []);
  const pointerHoverAtom = useMemo(() => atom(false), []);

  const setPointerDownAtom = useSetAtom(pointerDownAtom);
  const setPointerHoverAtom = useSetAtom(pointerHoverAtom);

  const handlePointerDown = useCallback(() => {
    pointerDown.current = true;
    setPointerDownAtom(pointerDown.current);
  }, [setPointerDownAtom]);
  const handlePointerUp = useCallback(() => {
    if (!pointerDown.current) return;
    pointerDown.current = false;
    setPointerDownAtom(pointerDown.current);
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
    helperAddPointerEvents(
      element,
      handlePointerUp,
      handlePointerDown,
      handlePointerHoverOn,
      handlePointerHoverOff
    );
    return () => {
      helperRemovePointerEvents(
        element,
        handlePointerUp,
        handlePointerDown,
        handlePointerHoverOn,
        handlePointerHoverOff
      );
    };
  }, [
    htmlEl,
    handlePointerDown,
    handlePointerHoverOff,
    handlePointerHoverOn,
    handlePointerUp,
  ]);

  return { pointerDownAtom, pointerHoverAtom };
}

export default usePointerClick;
