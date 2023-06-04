import BaseAtomStore from '@applications/base/BaseAtomStore';
import { systemState } from '@/store';
import DisplayController from './DisplayController';
import textStyle from '@styles/modules/text.module.scss';
import { getApplicationMeta } from '@utils/helpers';

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

  private readonly print = DisplayController.getInstance().print;

  private runApplication(args: string[]) {
    if (args.length === 0) return;

    const applicationMeta = getApplicationMeta(args[0]);
    if (applicationMeta === null) {
      this.print(<p className={textStyle.focus}>{'[Command Not Found]'}</p>);
      return;
    }

    const app = new applicationMeta.App();
    app.start();
  }

  private handlerInputCmdRaw(cmd: string) {
    const args = cmd.split(' ').filter((a) => a !== '');
    if (args.length === 0) {
      this.print(<p></p>);
      return;
    }

    this.print(<p>{'> ' + cmd}</p>);
    this.runApplication(args);
  }

  private init() {
    this.storeSubToAtom(systemState.userInputCmdRawAtom, () => {
      const cmd = this.storeGetAtom(systemState.userInputCmdRawAtom);
      if (cmd === null) return;
      this.handlerInputCmdRaw(cmd);
      this.storeSetAtom(systemState.userInputCmdRawAtom, null);
    });
  }
}

export default ApplicationController;
