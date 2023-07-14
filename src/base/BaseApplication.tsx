import { type AppName } from '@type/ApplicationTypes';
import BaseAtomStore from './BaseAtomStore';
import { applicationState } from '@store/index';
import { produce } from 'immer';
import DisplayController from '@applications/controllers/DisplayController';
import ApplicationController from '@applications/controllers/ApplicationController';
import { PROMPT_PARAM_INVALID } from '@applications/snippets';
import TextLabel from '@components/TextLabel';
import { v4 as uuid } from 'uuid';
import APPLICATION_INDEX from '@applications/index';

abstract class BaseApplication extends BaseAtomStore {
  public abstract name: AppName;
  protected id: string = uuid();

  protected args: string[] = [];
  private appPromptId: undefined | string = undefined;
  private readonly subProcesses: BaseApplication[] = [];
  private readonly displayController = DisplayController.getInstance();
  private readonly applicationController = ApplicationController.getInstance();

  // life cycle related methods
  protected abstract validate(): boolean;
  protected abstract run(): void;
  protected abstract cleanup(): void;

  public async start(
    args: string[],
    { isShowLabel = true }: { isShowLabel?: boolean } = {}
  ): Promise<void> {
    this.addApplicationInstanceToState();
    this.args = args;
    if (!this.validate()) {
      this.stop();
      return;
    }
    if (isShowLabel) {
      this.displayController.print(
        <TextLabel text={APPLICATION_INDEX[this.name].name} />
      );
    }
    this.run();
  }

  public stop() {
    this.cleanupSubProcesses();
    this.removeApplicationInstanceFromState();
    this.cleanup();
    this.stopAppPrompt();
    this.unlock();
  }

  // magics
  protected print(...args: Parameters<typeof this.displayController.print>) {
    return this.displayController.print(...args);
  }

  protected printUpdate(
    ...args: Parameters<typeof this.displayController.printUpdate>
  ) {
    this.displayController.printUpdate(...args);
  }

  protected runSubProcess(app: AppName, params: string[] = []) {
    const args = [app, ...params];
    const appInstance = this.applicationController.runApplication(app, {
      args,
      isShowLabel: false,
    });
    if (appInstance !== null) this.subProcesses.push(appInstance);
  }

  // other methods
  protected isForeground(): boolean {
    const topInstance = this.storeGetAtom(
      applicationState.applicationTopInstanceAtom
    );
    if (topInstance === null || topInstance.id !== this.id) return false;
    return true;
  }

  protected validateArgs({
    expectedArgsLength = 1,
    validationFunction = undefined,
  }: {
    expectedArgsLength?: number | number[];
    validationFunction?: () => boolean;
  } = {}): boolean {
    const argsLengthArray = Array.isArray(expectedArgsLength)
      ? expectedArgsLength
      : [expectedArgsLength];

    if (this.args.length === 0 || !argsLengthArray.includes(this.args.length)) {
      this.displayController.print(PROMPT_PARAM_INVALID);
      return false;
    }

    return validationFunction !== undefined ? validationFunction() : true;
  }

  protected isBackground(): boolean {
    return !this.isForeground();
  }

  private removeApplicationInstanceFromState() {
    const currentState = this.storeGetAtom(
      applicationState.applicationInstancesAtom
    );
    const nextState = produce(currentState, (draft) => {
      return draft.filter((app) => app.id !== this.id);
    });
    this.storeSetAtom(applicationState.applicationInstancesAtom, nextState);
  }

  private addApplicationInstanceToState() {
    const currentState = this.storeGetAtom(
      applicationState.applicationInstancesAtom
    );
    const nextState = produce(currentState, (draft) => {
      draft.push({
        id: this.id,
        name: this.name,
        instance: this,
      });
    });
    this.storeSetAtom(applicationState.applicationInstancesAtom, nextState);
  }

  private cleanupSubProcesses() {
    this.subProcesses.forEach((sub) => {
      sub.stop();
    });
  }

  protected initAppPrompt(inputListner: (input: string) => void) {
    if (this.appPromptId !== undefined) return;
    this.appPromptId = this.applicationController.initAppPrompt(
      inputListner,
      this.name,
      {
        promptStr: '>>>',
      }
    );
  }

  protected updateAppPrompt({
    promptStr = undefined,
    input = undefined,
    inputListener = undefined,
  }: {
    promptStr?: string | undefined;
    input?: string | undefined;
    inputListener?: undefined | ((input: string) => void);
  } = {}) {
    if (this.appPromptId === undefined) return;
    this.applicationController.updateAppPrompt(this.appPromptId, {
      promptStr,
      input,
      inputListener,
    });
  }

  protected stopAppPrompt() {
    if (this.appPromptId === undefined) return;
    this.applicationController.clearAppPrompt(this.appPromptId);
    this.appPromptId = undefined;
  }

  protected lock() {
    return this.applicationController.lock(this.id);
  }

  protected unlock() {
    return this.applicationController.unlock(this.id);
  }
}

export default BaseApplication;
