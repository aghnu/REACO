import { useMemo } from 'react';
import { icon } from '@/utils/svgFactory';
import type { IconFactoryFunc } from '@type/UtilsTypes';
import ApplicationController from '@applications/logics/ApplicationController';

interface Key {
  name: string;
  icon: IconFactoryFunc;
  onClickHandler: () => void;
}

function useFunctionKeys() {
  const keys: Key[] = useMemo(() => {
    return [
      {
        name: 'keyboard',
        icon: icon.keyboard,
        onClickHandler: () => {
          ApplicationController.getInstance().runApplication('keyboard');
        },
      },
      {
        name: 'clear',
        icon: icon.clean,
        onClickHandler: () => {
          ApplicationController.getInstance().runApplication('clear');
        },
      },
      {
        name: 'help',
        icon: icon.help,
        onClickHandler: () => {},
      },
      {
        name: 'home',
        icon: icon.home,
        onClickHandler: () => {
          ApplicationController.getInstance().runApplication('home');
        },
      },
      {
        name: 'about',
        icon: icon.info,
        onClickHandler: () => {},
      },
      {
        name: 'projects',
        icon: icon.projects,
        onClickHandler: () => {},
      },
    ];
  }, []);

  return keys;
}

export default useFunctionKeys;
