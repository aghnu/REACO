import { type DynamicClassName } from '@type/UtilsTypes';
import APPLICATION_INDEX from '@applications/index';
import type { AppMeta, AppNames } from '@type/ApplicationTypes';

export function getClassName(dynamicClassNames: DynamicClassName) {
  const classNameArray: string[] = [];

  dynamicClassNames.forEach((className) => {
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
