import { type DynamicClassName } from '@type/utilsTypes';

export function isKeyAllowed(key: string) {
  // eslint-disable-next-line
  const regex = /^([a-zA-Z0-9\/\s]|Backspace|Enter)$/g;
  if (key.match(regex) != null) return true;
  return false;
}

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
