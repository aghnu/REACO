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
    const path = window.location.pathname;
    const pathTarget = APPLICATION_INDEX[name].route;
    if (path === pathTarget) return;

    window.history.pushState(null, '', pathTarget);
  }

  public processCurrentPath() {
    const path = window.location.pathname;
    const values = Object.values(APPLICATION_INDEX);
    const searchIndex = values.findIndex((e) => e.route === path);
    if (searchIndex === -1) {
      this.appRouteUpdate('home');
      ApplicationController.getInstance().runApplication('home', true, false);
    } else {
      ApplicationController.getInstance().runApplication(
        values[searchIndex].name,
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
