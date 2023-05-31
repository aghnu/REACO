import BaseAtomStore from '@applications/base/BaseAtomStore';
import { userInputCmdRawAtom } from '@store/displayState';

class ApplicationController extends BaseAtomStore {
  protected static instance: ApplicationController | undefined;

  protected constructor() {
    super();
    this.init();
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

  private handlerInputCmdRaw(cmd: string) {
    console.log(cmd);
  }

  private init() {
    this.storeSubToAtom(userInputCmdRawAtom, () => {
      const cmd = this.storeGetAtom(userInputCmdRawAtom);
      if (cmd === null) return;
      this.handlerInputCmdRaw(cmd);
      this.storeSetAtom(userInputCmdRawAtom, null);
    });
  }
}

export default ApplicationController;
