import APPLICATION_INDEX, {
  APPLICATION_EXCLUDE_LIST_ROUTE,
} from '@/applications';
import { type AppName } from '@type/ApplicationTypes';
import ApplicationController from './ApplicationController';
import { produce } from 'immer';
import { systemState } from '@store/index';
import BaseAtomStore from '@base/BaseAtomStore';

class RouteController extends BaseAtomStore {
  protected static instance: RouteController | undefined;
  protected readonly basePath = window.location.pathname;

  protected constructor() {
    super();
    this.init();
  }

  public static getInstance(): RouteController {
    if (this.instance === undefined) {
      this.instance = new RouteController();
      this.instance.processCurrentPath();
    }
    return this.instance;
  }

  public static destroy() {
    if (this.instance === undefined) return;
    this.instance.storeClearSubs();
    window.removeEventListener('popstate', this.instance.processCurrentPath);
    this.instance = undefined;
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
    RouteController.getInstance().updatePromptInfo();
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

  private updatePromptInfo() {
    this.storeSetAtom(
      systemState.promptInfoAtom,
      produce((draft) => {
        draft.systemDomain = window.location.host;
        draft.systemPath = window.location.pathname;
      })
    );
  }

  private init() {
    window.addEventListener('popstate', this.processCurrentPath);
    this.updatePromptInfo();
  }
}

export default RouteController;
