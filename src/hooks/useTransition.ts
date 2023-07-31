import { useEffect, useRef } from 'react';

function useTransition(
  element: HTMLElement | null,
  classes: {
    enterActive: string;
    leaveActive: string;
    enterFrom: string;
    leaveTo: string;
  },
): [show: () => Promise<void>, hide: () => Promise<void>] {
  const show = useRef(async () => {});
  const hide = useRef(async () => {});

  useEffect(() => {
    if (element === null) {
      show.current = async () => {};
      hide.current = async () => {};
      return;
    }

    const el = element;
    let transitionEndListner: undefined | (() => void);
    let animationFrameRequest: undefined | number;

    const clearAnimationFrame = () => {
      if (animationFrameRequest !== undefined)
        window.cancelAnimationFrame(animationFrameRequest);
      animationFrameRequest = undefined;
    };

    const clearTransitionEndListner = () => {
      if (transitionEndListner !== undefined)
        el.removeEventListener('transitionend', transitionEndListner);
      transitionEndListner = undefined;
    };

    const resetElementState = () => {
      clearAnimationFrame();
      clearTransitionEndListner();
      el.classList.remove(classes.enterActive);
      el.classList.remove(classes.enterFrom);
      el.classList.remove(classes.leaveActive);
      el.classList.remove(classes.leaveTo);
    };

    const waitAnimationFrame = async () => {
      await new Promise<void>((resolve) => {
        clearAnimationFrame();
        animationFrameRequest = window.requestAnimationFrame(() => {
          clearAnimationFrame();
          animationFrameRequest = window.requestAnimationFrame(() => {
            clearAnimationFrame();
            resolve();
          });
        });
      });
    };

    const waitTransitionEndListner = async () => {
      await new Promise<void>((resolve) => {
        clearTransitionEndListner();
        transitionEndListner = () => {
          clearTransitionEndListner();
          resolve();
        };
        el.addEventListener('transitionend', transitionEndListner);
      });
    };

    // show
    show.current = async () => {
      resetElementState();
      el.classList.add(classes.enterFrom);
      await waitAnimationFrame();
      el.classList.add(classes.enterActive);
      await waitAnimationFrame();
      el.classList.remove(classes.enterFrom);
      await waitTransitionEndListner();
      el.classList.remove(classes.enterActive);
    };

    // hide
    hide.current = async () => {
      resetElementState();
      el.classList.add(classes.leaveActive);
      await waitAnimationFrame();
      el.classList.add(classes.leaveTo);
      await waitTransitionEndListner();
      el.classList.remove(classes.leaveActive);
    };

    return () => {
      clearAnimationFrame();
      clearTransitionEndListner();
    };
  }, [element, classes]);

  return [
    async () => {
      await show.current();
    },
    async () => {
      await hide.current();
    },
  ];
}

export default useTransition;
