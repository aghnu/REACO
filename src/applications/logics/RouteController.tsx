import APPLICATION_INDEX, {
  APPLICATION_EXCLUDE_LIST_ROUTE,
} from '@/applications';
import { type AppName } from '@type/ApplicationTypes';
import ApplicationController from './ApplicationController';

class RouteController {
  protected static instance: RouteController | undefined;
  protected readonly basePath = window.location.pathname;

  protected constructor() {
    this.init();
  }

  public static getInstance(): RouteController {
    if (this.instance === undefined) this.instance = new RouteController();
    return this.instance;
  }

  public destroy() {
    window.removeEventListener('popstate', this.processCurrentPath);
  }

  public static start() {
    RouteController.getInstance();
  }

  public appRouteUpdate(name: AppName) {
    const routeHash = window.location.hash.substring(1);

    // special cases
    if (APPLICATION_EXCLUDE_LIST_ROUTE.includes(name)) return;
    if (name === 'home') {
      window.history.replaceState(null, '', this.basePath);
      return;
    }

    // other route
    if (name === routeHash) return;
    window.history.pushState(null, '', this.basePath + '#' + name);
  }

  public processCurrentPath() {
    const routeHash = window.location.hash.substring(1);
    const appNames = Object.keys(APPLICATION_INDEX);
    if (
      routeHash === 'home' ||
      (APPLICATION_EXCLUDE_LIST_ROUTE as string[]).includes(routeHash) ||
      !appNames.includes(routeHash)
    ) {
      RouteController.getInstance().appRouteUpdate('home');
      ApplicationController.getInstance().runApplication('home', true, false);
    } else {
      ApplicationController.getInstance().runApplication(
        routeHash as AppName,
        true,
        false
      );
    }
  }

  private init() {
    window.addEventListener('popstate', this.processCurrentPath);
  }
}

export default RouteController;
