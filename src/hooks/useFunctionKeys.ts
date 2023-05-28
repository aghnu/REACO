import { useMemo } from 'react';
import { icon } from '@/utils/svgFactory';
import { type IconFactoryFunc } from '@type/utilsTypes';

interface Key {
  name: string;
  icon: IconFactoryFunc;
}

function useFunctionKeys() {
  const keys: Key[] = useMemo(() => {
    return [
      {
        name: 'keyboard',
        icon: icon.keyboard,
      },
      {
        name: 'clear',
        icon: icon.clean,
      },
      {
        name: 'help',
        icon: icon.help,
      },
      {
        name: 'home',
        icon: icon.home,
      },
      {
        name: 'about',
        icon: icon.info,
      },
      {
        name: 'projects',
        icon: icon.projects,
      },
    ];
  }, []);

  return keys;
}

export default useFunctionKeys;
