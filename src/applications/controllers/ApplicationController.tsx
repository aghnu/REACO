import BaseAtomStore from '@base/BaseAtomStore';
import { systemState, applicationState } from '@/store';
import DisplayController from './DisplayController';
import { getApplicationMeta } from '@utils/helpers';
import { type AppName } from '@type/ApplicationTypes';
import APPLICATION_INDEX, { APPLICATION_EXCLUDE_LOCK } from '@/applications';
import TextRaw from '@components/TextRaw';
import KeyboardController from './KeyboardController';
import RouteController from './RouteController';
import type BaseApplication from '@base/BaseApplication';
import TextLabel from '@components/TextLabel';
import { type PromptApp } from '@type/SystemStateTypes';
import { produce } from 'immer';
import { v4 as uuid } from 'uuid';

class ApplicationController extends BaseAtomStore {
  protected static instance: ApplicationController | undefined;
  protected displayController: DisplayController =
    DisplayController.getInstance();

  protected enterKeyListnerUnSubFunc: (() => void) | undefined;
  private appLock: string | undefined = undefined;

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
    this.instance.unlockForce();
    this.instance.storeClearSubs();
    this.instance.clearApplications();
    if (this.instance.enterKeyListnerUnSubFunc !== undefined)
      this.instance.enterKeyListnerUnSubFunc();
    this.instance.deleteAllAppPrompt();
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
  ): BaseApplication | null {
    if (this.appLock !== undefined && !APPLICATION_EXCLUDE_LOCK.includes(app)) {
      const applicationInstances = this.storeGetAtom(
        applicationState.applicationInstancesAtom
      );
      const appLockInstance = applicationInstances.find(
        (appInstance) => appInstance.id === this.appLock
      );
      if (appLockInstance !== undefined) {
        const appName = appLockInstance.name;
        this.displayController.print(<TextLabel text={`Application Locked`} />);
        RouteController.getInstance().appRouteUpdate(appName);
        return null;
      } else {
        this.unlockForce();
      }
    }
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

  private enterKeyListner() {
    const promptAppTop = this.storeGetAtom(systemState.promptAppTopAtom);
    if (promptAppTop === null) {
      const input = this.storeGetAtom(systemState.userInputAtom);
      const args = [...this.storeGetAtom(systemState.userCmdArgsAtom)];
      void this.handlerInputArgs(input, args);
      this.storeSetAtom(systemState.userInputAtom, '');
    } else {
      promptAppTop.inputListener(promptAppTop.input);
      this.updateAppPrompt(promptAppTop.id, { input: '' });
    }
  }

  private init() {
    this.enterKeyListnerUnSubFunc =
      KeyboardController.getInstance().subscribeKey('Enter', () => {
        this.enterKeyListner();
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

  public initAppPrompt(
    inputListener: (input: string) => void,
    {
      promptStr = '',
      input = '',
    }: {
      promptStr?: string;
      input?: string;
    } = {}
  ): string {
    const id = uuid();
    const prompt: PromptApp = {
      promptStr,
      input,
      id,
      inputListener,
    };

    this.storeSetAtom(
      systemState.promptAppAtom,
      produce(this.storeGetAtom(systemState.promptAppAtom), (draft) => {
        draft.push(prompt);
      })
    );

    return id;
  }

  public clearAppPrompt(id: string) {
    this.storeSetAtom(
      systemState.promptAppAtom,
      produce(this.storeGetAtom(systemState.promptAppAtom), (draft) => {
        return draft.filter((prompt) => prompt.id !== id);
      })
    );
  }

  public deleteAllAppPrompt() {
    this.storeSetAtom(systemState.promptAppAtom, []);
  }

  public updateAppPrompt(
    id: string,
    {
      promptStr = undefined,
      input = undefined,
      inputListener = undefined,
    }: {
      promptStr?: string | undefined;
      input?: string | undefined;
      inputListener?: ((input: string) => void) | undefined;
    } = {}
  ) {
    this.storeSetAtom(
      systemState.promptAppAtom,
      produce(this.storeGetAtom(systemState.promptAppAtom), (draft) => {
        const index = draft.findIndex((prompt) => prompt.id === id);
        if (index === -1) return;
        const prompt = draft[index];
        prompt.input = input ?? prompt.input;
        prompt.promptStr = promptStr ?? prompt.promptStr;
        prompt.inputListener = inputListener ?? prompt.inputListener;
      })
    );
  }

  public lock(appId: string): boolean {
    if (this.appLock !== undefined) return false;
    this.appLock = appId;
    return true;
  }

  public unlock(appId: string): boolean {
    if (this.appLock === undefined) return true;
    if (this.appLock !== appId) return false;
    this.appLock = undefined;
    return true;
  }

  public unlockForce() {
    this.appLock = undefined;
  }
}

export default ApplicationController;
