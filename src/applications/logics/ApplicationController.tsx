import BaseAtomStore from '@base/BaseAtomStore';
import { systemState, applicationState } from '@/store';
import DisplayController from './DisplayController';
import textStyle from '@styles/modules/text.module.scss';
import { getApplicationMeta } from '@utils/helpers';
import { type AppNames } from '@type/ApplicationTypes';
import APPLICATION_INDEX from '@/applications';
import TextRaw from '@components/TextRaw';
import KeyboardController from './KeyboardController';
import { type EventListenerContext } from '@utils/eventListenerWithContext';

class ApplicationController extends BaseAtomStore {
  protected static instance: ApplicationController | undefined;
  protected displayController: DisplayController =
    DisplayController.getInstance();

  protected enterKeyListnerContext: EventListenerContext | undefined;

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
    if (this.enterKeyListnerContext !== undefined)
      this.enterKeyListnerContext.remove();
  }

  public static start() {
    ApplicationController.getInstance();
  }

  public runApplication(app: AppNames, isShowLabel: boolean = true) {
    const applicationMeta = APPLICATION_INDEX[app];
    const appInstance = new applicationMeta.App();
    if (isShowLabel)
      this.displayController.print(
        <p className={textStyle.focus}>{`[${app}]`}</p>
      );
    appInstance.start();
  }

  public runApplicationFromArgs(args: string[]) {
    if (args.length === 0) return;

    const applicationMeta = getApplicationMeta(args[0]);
    if (applicationMeta === null) {
      this.displayController.print(
        <p className={textStyle.focus}>{'[Command Not Found]'}</p>
      );
      return;
    }

    this.runApplication(applicationMeta.name);
  }

  public handlerInputCmdRaw(cmd: string) {
    const args = cmd.split(' ').filter((a) => a !== '');
    if (args.length === 0) {
      this.displayController.print(<br />);
      return;
    }

    this.displayController.print(<TextRaw type="p" text={'> ' + cmd} />);
    this.runApplicationFromArgs(args);
  }

  private init() {
    this.enterKeyListnerContext = KeyboardController.getInstance().subscribeKey(
      'Enter',
      () => {
        const cmd = this.storeGetAtom(systemState.userInputAtom);
        this.handlerInputCmdRaw(cmd);
        this.storeSetAtom(systemState.userInputAtom, '');
      }
    );
  }

  public clearApplications() {
    const applications = this.storeGetAtom(
      applicationState.applicationInstancesAtom
    );

    applications.forEach((app) => {
      app.instance.stop();
    });
  }
}

export default ApplicationController;
