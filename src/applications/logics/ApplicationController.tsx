import BaseAtomStore from '@base/BaseAtomStore';
import { systemState, applicationState } from '@/store';
import DisplayController from './DisplayController';
import { getApplicationMeta } from '@utils/helpers';
import { type AppName } from '@type/ApplicationTypes';
import APPLICATION_INDEX from '@/applications';
import TextRaw from '@components/TextRaw';
import KeyboardController from './KeyboardController';
import RouteController from './RouteController';
import type BaseApplication from '@base/BaseApplication';
import TextLabel from '@components/TextLabel';

class ApplicationController extends BaseAtomStore {
  protected static instance: ApplicationController | undefined;
  protected displayController: DisplayController =
    DisplayController.getInstance();

  protected enterKeyListnerUnSubFunc: (() => void) | undefined;

  protected constructor() {
    super();
    this.init();
  }

  public static getInstance(): ApplicationController {
    if (this.instance === undefined)
      this.instance = new ApplicationController();
    return this.instance;
  }

  public static destroy(): void {
    if (this.instance === undefined) return;
    this.instance.storeClearSubs();
    this.instance.clearApplications();
    if (this.instance.enterKeyListnerUnSubFunc !== undefined)
      this.instance.enterKeyListnerUnSubFunc();
    this.instance = undefined;
  }

  public runApplication(
    app: AppName,
    {
      args = [app],
      isShowLabel = true,
      isChangeRoute = isShowLabel,
    }: {
      args?: string[];
      isShowLabel?: boolean;
      isChangeRoute?: boolean;
    } = {}
  ): BaseApplication {
    const applicationMeta = APPLICATION_INDEX[app];
    const appInstance = new applicationMeta.App();
    if (isChangeRoute) RouteController.getInstance().appRouteUpdate(app);
    void appInstance.start(args, { isShowLabel });
    return appInstance as BaseApplication;
  }

  public runApplicationFromArgs(args: string[]) {
    if (args.length === 0) return;

    const applicationMeta = getApplicationMeta(args[0]);
    if (applicationMeta === null) {
      this.displayController.print(<TextLabel text="Command Not Found" />);
      return;
    }

    this.runApplication(applicationMeta.name, { args });
  }

  public async runApplicationFromArgsAsync(args: string[]): Promise<void> {
    this.runApplicationFromArgs(args);
  }

  public async handlerInputArgs(input: string, args: string[]) {
    if (args.length === 0) {
      this.displayController.print(<br />);
      return;
    }

    this.displayController.print(<TextRaw type="p" text={'> ' + input} />);
    await this.runApplicationFromArgsAsync(args);
  }

  private init() {
    this.enterKeyListnerUnSubFunc =
      KeyboardController.getInstance().subscribeKey('Enter', () => {
        const input = this.storeGetAtom(systemState.userInputAtom);
        const args = [...this.storeGetAtom(systemState.userCmdArgsAtom)];
        void this.handlerInputArgs(input, args);
        this.storeSetAtom(systemState.userInputAtom, '');
      });
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
