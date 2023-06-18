import { type AppName } from '@type/ApplicationTypes';
import BaseAtomStore from './BaseAtomStore';
import { applicationState } from '@store/index';
import { produce } from 'immer';
import DisplayController from '@applications/logics/DisplayController';
import ApplicationController from '@applications/logics/ApplicationController';
import { PROMPT_PARAM_INVALID } from '@applications/snippets';
import TextLabel from '@components/TextLabel';
import { v4 as uuid } from 'uuid';

abstract class BaseApplication extends BaseAtomStore {
  public abstract name: AppName;
  protected id: string = uuid();

  protected args: string[] = [];
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
      this.displayController.print(<TextLabel text={this.name} />);
    }
    this.run();
  }

  public stop() {
    this.cleanupSubProcesses();
    this.removeApplicationInstanceFromState();
    this.cleanup();
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
    this.subProcesses.push(
      this.applicationController.runApplication(app, {
        args,
        isShowLabel: false,
      })
    );
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
}

export default BaseApplication;
