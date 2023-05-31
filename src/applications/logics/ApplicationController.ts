import BaseAtomStore from '@applications/base/BaseAtomStore';

class ApplicationController extends BaseAtomStore {
  protected static instance: ApplicationController | undefined;

  protected constructor() {
    super();
  }

  public static getInstance(): ApplicationController {
    if (this.instance === undefined)
      this.instance = new ApplicationController();
    return this.instance;
  }

  public destroy(): void {
    ApplicationController.instance = undefined;
    this.storeClearSubs();
  }

  public static start() {
    ApplicationController.getInstance();
  }
}

export default ApplicationController;
