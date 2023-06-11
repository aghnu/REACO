import APPLICATION_INDEX from '@/applications';
import { type AppName } from '@type/ApplicationTypes';
import ApplicationController from './ApplicationController';

class RouteController {
  protected static instance: RouteController | undefined;

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

    // special case for home routel
    if (name === 'home') {
      window.history.replaceState(null, '', '/');
      return;
    }

    // other route
    if (name === routeHash) return;
    window.history.pushState(null, '', '#' + name);
  }

  public processCurrentPath() {
    const routeHash = window.location.hash.substring(1);
    const appNames = Object.keys(APPLICATION_INDEX);
    if (routeHash === 'home' || !appNames.includes(routeHash)) {
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