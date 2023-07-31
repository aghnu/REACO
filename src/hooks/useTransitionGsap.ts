import { gsap } from 'gsap';
import { useEffect, useRef } from 'react';

function useTransitionGsap(
  element: HTMLElement | null,
  states: {
    enter: gsap.TweenVars;
    leave: gsap.TweenVars;
  },
) {
  const show = useRef(async () => {});
  const hide = useRef(async () => {});

  useEffect(() => {
    if (element === null) {
      show.current = async () => {};
      hide.current = async () => {};
      return;
    }
    const el = element;

    let gsapTweenInstanceFrom: undefined | gsap.core.Tween;
    let gsapTweenInstanceTo: undefined | gsap.core.Tween;

    show.current = async () => {
      await new Promise<void>((resolve) => {
        if (gsapTweenInstanceFrom !== undefined) gsapTweenInstanceFrom.kill();
        gsapTweenInstanceFrom = gsap
          .from(el, Object.assign({ overwrite: 'auto' }, states.enter))
          .eventCallback('onComplete', () => {
            resolve();
          });
      });
    };

    hide.current = async () => {
      await new Promise<void>((resolve) => {
        if (gsapTweenInstanceTo !== undefined) gsapTweenInstanceTo.kill();
        gsapTweenInstanceTo = gsap
          .to(el, Object.assign({ overwrite: 'auto' }, states.leave))
          .eventCallback('onComplete', () => {
            resolve();
          });
      });
    };

    return () => {
      if (gsapTweenInstanceFrom !== undefined) gsapTweenInstanceFrom.kill();
      if (gsapTweenInstanceTo !== undefined) gsapTweenInstanceTo.kill();
    };
  }, [element, states]);

  return [
    async () => {
      await show.current();
    },
    async () => {
      await hide.current();
    },
  ];
}

export default useTransitionGsap;
