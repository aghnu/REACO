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
} as const;

export default APPLICATION_INDEX;
export { AppHome, AppKeyboard };
