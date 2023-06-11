import AppClear from './AppClear';
import AppContact from './AppContact';
import AppHome from './AppHome';
import AppKeyboard from './AppKeyboard';
import AppLocation from './AppLocation';

const APPLICATION_INDEX = {
  home: {
    name: 'home',
    App: AppHome,
    route: '/',
  },
  keyboard: {
    name: 'keyboard',
    App: AppKeyboard,
    route: '/keyboard',
  },
  clear: {
    name: 'clear',
    App: AppClear,
    route: '/clear',
  },
  location: {
    name: 'location',
    App: AppLocation,
    route: '/location',
  },
  contact: {
    name: 'contact',
    App: AppContact,
    route: '/contact',
  },
} as const;

export default APPLICATION_INDEX;
export { AppHome, AppKeyboard };
