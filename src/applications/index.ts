import AppClear from './AppClear';
import AppHome from './AppHome';
import AppKeyboard from './AppKeyboard';

const APPLICATION_INDEX = {
  home: {
    name: 'home',
    App: AppHome,
  },
  keyboard: {
    name: 'keyboard',
    App: AppKeyboard,
  },
  clear: {
    name: 'clear',
    App: AppClear,
  },
} as const;

export default APPLICATION_INDEX;
export { AppHome, AppKeyboard };
