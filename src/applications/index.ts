import { type AppName } from '@type/ApplicationTypes';
import AppClear from './AppClear';
import AppContact from './AppContact';
import AppHome from './AppHome';
import AppKeyboard from './AppKeyboard';
import AppLocation from './AppLocation';
import AppTheme from './AppTheme';
import AppHelp from './AppHelp';
import AppSkills from './AppSkills';
import AppSitemap from './AppSitemap';
import AppProjects from './AppProjects';
import AppPortfolio from './AppPortfolio';
import AppAbout from './AppAbout';
import AppTicTacToe from './AppTicTacToe';

const APPLICATION_INDEX = {
  projects: {
    name: 'Projects',
    App: AppProjects,
    desc: 'list all the projects that I worked on',
  },
  portfolio: {
    name: 'Portfolio',
    App: AppPortfolio,
    desc: 'print my portfolios',
  },
  sitemap: {
    name: 'Sitemap',
    App: AppSitemap,
    desc: 'display site map',
  },
  contact: {
    name: 'Contact',
    App: AppContact,
    desc: 'list my contact information',
  },
  home: {
    name: 'Home',
    App: AppHome,
    desc: 'display web home page',
  },
  keyboard: {
    name: 'Keyboard',
    App: AppKeyboard,
    desc: 'open/close the virtual keyboard',
  },
  clear: {
    name: 'Clear',
    App: AppClear,
    desc: 'clear the terminal screen',
  },
  location: {
    name: 'Location',
    App: AppLocation,
    desc: 'print my current timezone',
  },
  theme: {
    name: 'Theme',
    App: AppTheme,
    desc: 'change console theme',
  },
  help: {
    name: 'Help',
    App: AppHelp,
    desc: 'list all the supported commands',
  },
  skills: {
    name: 'Skills',
    App: AppSkills,
    desc: 'list my technical skills',
  },
  about: {
    name: 'About',
    App: AppAbout,
    desc: 'display information about this website',
  },
  tictactoe: {
    name: 'Tic Tac Toe',
    App: AppTicTacToe,
    desc: 'play tic tac toe against REACO',
  },
} as const;

// special excluding list
const APPLICATION_EXCLUDE_LIST_ROUTE: AppName[] = ['keyboard', 'theme'];
const APPLICATION_EXCLUDE_LOCK: AppName[] = ['keyboard', 'theme'];

export default APPLICATION_INDEX;
export { APPLICATION_EXCLUDE_LIST_ROUTE, APPLICATION_EXCLUDE_LOCK };
