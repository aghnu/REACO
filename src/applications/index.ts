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

const APPLICATION_INDEX = {
  projects: {
    name: 'projects',
    App: AppProjects,
    desc: 'list all the projects that I worked on',
  },
  portfolio: {
    name: 'portfolio',
    App: AppPortfolio,
    desc: 'print my portfolios',
  },
  sitemap: {
    name: 'sitemap',
    App: AppSitemap,
    desc: 'display site map',
  },
  contact: {
    name: 'contact',
    App: AppContact,
    desc: 'list my contact information',
  },
  home: {
    name: 'home',
    App: AppHome,
    desc: 'display web home page',
  },
  keyboard: {
    name: 'keyboard',
    App: AppKeyboard,
    desc: 'open/close the virtual keyboard',
  },
  clear: {
    name: 'clear',
    App: AppClear,
    desc: 'clear the terminal screen',
  },
  location: {
    name: 'location',
    App: AppLocation,
    desc: 'print my current timezone',
  },
  theme: {
    name: 'theme',
    App: AppTheme,
    desc: 'change console theme',
  },
  help: {
    name: 'help',
    App: AppHelp,
    desc: 'list all the supported commands',
  },
  skills: {
    name: 'skills',
    App: AppSkills,
    desc: 'list my technical skills',
  },
  about: {
    name: 'about',
    App: AppAbout,
    desc: 'display information about this website',
  },
} as const;

// special excluding list
const APPLICATION_EXCLUDE_LIST_ROUTE: AppName[] = ['keyboard', 'theme'];

export default APPLICATION_INDEX;
export { APPLICATION_EXCLUDE_LIST_ROUTE };
