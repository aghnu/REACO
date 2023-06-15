import { type AppName } from '@type/ApplicationTypes';
import AppClear from './AppClear';
import AppContact from './AppContact';
import AppHome from './AppHome';
import AppKeyboard from './AppKeyboard';
import AppLocation from './AppLocation';
import AppTheme from './AppTheme';

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
  theme: {
    name: 'theme',
    App: AppTheme,
  },
} as const;

// special excluding list
const APPLICATION_EXCLUDE_LIST_ROUTE: AppName[] = ['keyboard', 'theme'];

export default APPLICATION_INDEX;
export { APPLICATION_EXCLUDE_LIST_ROUTE };
