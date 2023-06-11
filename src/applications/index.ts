import AppClear from './AppClear';
import AppContact from './AppContact';
import AppHome from './AppHome';
import AppKeyboard from './AppKeyboard';
import AppLocation from './AppLocation';

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
  location: {
    name: 'location',
    App: AppLocation,
  },
  contact: {
    name: 'contact',
    App: AppContact,
  },
} as const;

export default APPLICATION_INDEX;
export { AppHome, AppKeyboard };
