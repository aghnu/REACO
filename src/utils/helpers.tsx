import { type DynamicClassName } from '@type/UtilsTypes';
import APPLICATION_INDEX from '@applications/index';
import type { AppMeta, AppName } from '@type/ApplicationTypes';
import { type PrimitiveAtom, type Atom, atom } from 'jotai';
import { Base64 } from 'js-base64';

export function getClassName(dynamicClassNames: DynamicClassName) {
  const classNameArray: string[] = [];

  dynamicClassNames.forEach((className) => {
    if (className === undefined || className === null || className === '')
      return;

    // string
    if (typeof className === 'string') {
      classNameArray.push(className);
      return;
    }

    // object
    Object.keys(className).forEach((key) => {
      if (className[key]) {
        classNameArray.push(key);
      }
    });
  });

  return classNameArray.join(' ');
}

export function waitFrames(callback: () => void, numFrames: number = 1) {
  if (numFrames <= 0) {
    callback();
    return;
  }
  window.requestAnimationFrame(() => {
    waitFrames(callback, numFrames - 1);
  });
}

export function getApplicationMeta(name: string): AppMeta | null {
  const keys = Object.keys(APPLICATION_INDEX) as AppName[];
  for (let i = 0; i < keys.length; i++) {
    if (keys[i] === name) {
      return APPLICATION_INDEX[name];
    }
    if (([...APPLICATION_INDEX[keys[i]].alias] as string[]).includes(name)) {
      return APPLICATION_INDEX[keys[i]];
    }
  }
  return null;
}

export function getAppName(name: string): AppName | null {
  const keys = Object.keys(APPLICATION_INDEX) as AppName[];
  for (let i = 0; i < keys.length; i++) {
    if (keys[i] === name) {
      return keys[i];
    }
    if (([...APPLICATION_INDEX[keys[i]].alias] as string[]).includes(name)) {
      return keys[i];
    }
  }
  return null;
}

export function hasApplication(name: string): boolean {
  return getApplicationMeta(name) !== null;
}

export function checkIsDevEnv() {
  return process.env.NODE_ENV === 'development';
}

export function addLabelToAtom<
  T extends Atom<unknown> | PrimitiveAtom<unknown>,
>(label: string, atom: T): T {
  if (checkIsDevEnv()) {
    atom.debugLabel = label;
  }
  return atom;
}

/**
 * this function differs from jotai builtin atomWithStorage
 *  - it is not using async
 *  - it reads value from local storage and use it as init value
 *  - this prevent the brief state change due to initial value differs from storage value
 *  - use this function if data is small
 */
export function atomWithLocalStorage<T = unknown>(
  key: string,
  initialValue: T,
  transformFuncs: {
    set: (data: T) => string;
    get: (data: string) => T;
  } = {
    set: (d) => JSON.stringify(d),
    get: (d) => JSON.parse(d),
  },
  encodeFuncs: {
    set: (data: string) => string;
    get: (data: string) => string;
  } = {
    set: (d) => d,
    get: (d) => d,
  },
): PrimitiveAtom<T> {
  const keyReal = encodeFuncs.set(key);
  const getInitialValue = () => {
    const item = localStorage.getItem(keyReal);
    if (item !== null) {
      try {
        return transformFuncs.get(encodeFuncs.get(item));
      } catch (_) {
        return initialValue;
      }
    }
    return initialValue;
  };
  const baseAtom = atom(getInitialValue());
  const derivedAtom = atom(
    (get) => get(baseAtom),
    (get, set, update) => {
      const nextValue =
        typeof update === 'function' ? update(get(baseAtom)) : update;
      set(baseAtom, nextValue);
      localStorage.setItem(
        keyReal,
        encodeFuncs.set(transformFuncs.set(nextValue)),
      );
    },
  );
  return derivedAtom;
}

export const base64EncodeFuncs = {
  get: (d: string) => Base64.decode(d),
  set: (d: string) => Base64.encode(d),
};
