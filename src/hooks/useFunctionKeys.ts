import { useMemo } from 'react';
import { icon } from '@/utils/svgFactory';
import type { IconFactoryFunc } from '@type/UtilsTypes';
import ApplicationController from '@applications/controllers/ApplicationController';
import { type AppName } from '@type/ApplicationTypes';

interface Key {
  name: AppName;
  icon: IconFactoryFunc;
  onClickHandler: () => void;
}

function handleKeyClick(name: AppName) {
  ApplicationController.getInstance().runApplication(name);
}

function useFunctionKeys() {
  const keys: Key[] = useMemo(() => {
    return [
      {
        name: 'keyboard',
        icon: icon.keyboard,
        onClickHandler: () => {
          handleKeyClick('keyboard');
        },
      },
      {
        name: 'clear',
        icon: icon.clean,
        onClickHandler: () => {
          handleKeyClick('clear');
        },
      },
      {
        name: 'help',
        icon: icon.help,
        onClickHandler: () => {
          handleKeyClick('help');
        },
      },
      {
        name: 'home',
        icon: icon.home,
        onClickHandler: () => {
          handleKeyClick('home');
        },
      },
      {
        name: 'about',
        icon: icon.info,
        onClickHandler: () => {
          handleKeyClick('about');
        },
      },
      {
        name: 'projects',
        icon: icon.projects,
        onClickHandler: () => {
          handleKeyClick('projects');
        },
      },
    ];
  }, []);

  return keys;
}

export default useFunctionKeys;
