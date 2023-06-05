import { type DynamicClassName } from '@type/UtilsTypes';
import APPLICATION_INDEX from '@applications/index';
import type { AppMeta, AppNames } from '@type/ApplicationTypes';
import { type PrimitiveAtom, type Atom } from 'jotai';

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

export function getApplicationMeta(name: string): AppMeta | null {
  const keys = Object.keys(APPLICATION_INDEX);
  if (keys.includes(name)) {
    return APPLICATION_INDEX[name as AppNames];
  }
  return null;
}

export function checkIsDevEnv() {
  return process.env.NODE_ENV === 'development';
}

export function addLabelToAtom<
  T extends Atom<unknown> | PrimitiveAtom<unknown>
>(label: string, atom: T): T {
  if (checkIsDevEnv()) {
    atom.debugLabel = label;
  }
  return atom;
}
