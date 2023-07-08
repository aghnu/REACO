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
    cmd: 'projects',
    alias: ['project'],
    App: AppProjects,
    desc: 'list all the projects that I worked on',
  },
  portfolio: {
    name: 'Portfolio',
    cmd: 'portfolio',
    alias: [],
    App: AppPortfolio,
    desc: 'print my portfolios',
  },
  sitemap: {
    name: 'Sitemap',
    cmd: 'sitemap',
    alias: [],
    App: AppSitemap,
    desc: 'display site map',
  },
  contact: {
    name: 'Contact',
    cmd: 'contact',
    alias: [],
    App: AppContact,
    desc: 'list my contact information',
  },
  home: {
    name: 'Home',
    cmd: 'home',
    alias: ['/'],
    App: AppHome,
    desc: 'display web home page',
  },
  keyboard: {
    name: 'Keyboard',
    cmd: 'keyboard',
    alias: ['key'],
    App: AppKeyboard,
    desc: 'open/close the virtual keyboard',
  },
  clear: {
    name: 'Clear',
    cmd: 'clear',
    alias: [],
    App: AppClear,
    desc: 'clear the terminal screen',
  },
  location: {
    name: 'Location',
    cmd: 'location',
    alias: [],
    App: AppLocation,
    desc: 'print my current timezone',
  },
  theme: {
    name: 'Theme',
    cmd: 'theme',
    alias: [],
    App: AppTheme,
    desc: 'change console theme',
  },
  help: {
    name: 'Help',
    cmd: 'help',
    alias: ['man'],
    App: AppHelp,
    desc: 'list all the supported commands',
  },
  skills: {
    name: 'Skills',
    cmd: 'skills',
    alias: ['skill'],
    App: AppSkills,
    desc: 'list my technical skills',
  },
  about: {
    name: 'About',
    cmd: 'about',
    alias: [],
    App: AppAbout,
    desc: 'display information about this website',
  },
  tictactoe: {
    name: 'Tic Tac Toe',
    cmd: 'tictactoe',
    alias: ['ttt'],
    App: AppTicTacToe,
    desc: 'play tic tac toe against REACO',
  },
} as const;

// special excluding list
const APPLICATION_EXCLUDE_LIST_ROUTE: AppName[] = ['keyboard', 'theme'];
const APPLICATION_EXCLUDE_LOCK: AppName[] = ['keyboard', 'theme'];

export default APPLICATION_INDEX;
export { APPLICATION_EXCLUDE_LIST_ROUTE, APPLICATION_EXCLUDE_LOCK };
