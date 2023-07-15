import BaseAtomStore from '@base/BaseAtomStore';
import { systemState, applicationState } from '@/store';
import DisplayController from './DisplayController';
import { getAppName } from '@utils/helpers';
import { type AppName } from '@type/ApplicationTypes';
import APPLICATION_INDEX, { APPLICATION_EXCLUDE_LOCK } from '@/applications';
import TextRaw from '@components/TextRaw';
import RouteController from './RouteController';
import type BaseApplication from '@base/BaseApplication';
import TextLabel from '@components/TextLabel';
import TextButton from '@components/TextButton';
import { type PromptApp } from '@type/SystemStateTypes';
import { produce } from 'immer';
import { searchApplicationIndex } from '@utils/searching';

class ApplicationController extends BaseAtomStore {
  protected static instance: ApplicationController | undefined;
  private appLock: string | undefined = undefined;

  protected constructor() {
    super();
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
    } = {},
  ): BaseApplication | null {
    if (this.appLock !== undefined && !APPLICATION_EXCLUDE_LOCK.includes(app)) {
      const applicationInstances = this.storeGetAtom(
        applicationState.applicationInstancesAtom,
      );
      const appLockInstance = applicationInstances.find(
        (appInstance) => appInstance.id === this.appLock,
      );
      if (appLockInstance !== undefined) {
        const appName = appLockInstance.name;
        DisplayController.getInstance().print(
          <TextLabel text={`Application Locked`} />,
        );
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

    const appName = getAppName(args[0]);
    const appNameSearch = searchApplicationIndex(args[0]);
    if (appName === null) {
      DisplayController.getInstance().print(
        <TextLabel text={`${args[0]}: command not found`} />,
      );
      if (appNameSearch.length !== 0) {
        DisplayController.getInstance().print(
          <p>
            <TextRaw text="Do you mean " />
            <TextButton
              className="gl-color-text-focus"
              onClick={() => {
                this.runApplicationFromArgs([appNameSearch[0].cmd]);
              }}
            >
              {appNameSearch[0].cmd}
            </TextButton>
            <span>?</span>
          </p>,
        );
      }
      return;
    }

    this.runApplication(appName, { args });
  }

  public async runApplicationFromArgsAsync(args: string[]): Promise<void> {
    this.runApplicationFromArgs(args);
  }

  public async handlerInputArgs(input: string, args: string[]) {
    if (args.length === 0) {
      DisplayController.getInstance().print(<br />);
      return;
    }
    DisplayController.getInstance().print(
      <TextRaw type="p" text={'> ' + input} />,
    );
    await this.runApplicationFromArgsAsync(args);
  }

  public clearApplications() {
    const applications = this.storeGetAtom(
      applicationState.applicationInstancesAtom,
    );

    applications.forEach((app) => {
      app.instance.stop();
    });
  }

  public initAppPrompt(
    inputListener: (input: string) => void,
    promptId: AppName,
    {
      promptStr = '',
      input = '',
    }: {
      promptStr?: string;
      input?: string;
    } = {},
  ): string {
    const prompt: PromptApp = {
      promptStr,
      input,
      id: promptId,
      inputListener,
    };

    this.storeSetAtom(
      systemState.promptAppAtom,
      produce(this.storeGetAtom(systemState.promptAppAtom), (draft) => {
        draft.push(prompt);
      }),
    );

    return promptId;
  }

  public clearAppPrompt(id: string) {
    this.storeSetAtom(
      systemState.promptAppAtom,
      produce(this.storeGetAtom(systemState.promptAppAtom), (draft) => {
        return draft.filter((prompt) => prompt.id !== id);
      }),
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
    } = {},
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
      }),
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
