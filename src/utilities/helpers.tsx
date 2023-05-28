import { type DynamicClassName } from '@type/utilitiesTypes';

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
