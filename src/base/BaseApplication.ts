import { type AppNames } from '@type/ApplicationTypes';
import BaseAtomStore from './BaseAtomStore';
import { applicationState } from '@store/index';
import { produce } from 'immer';
import DisplayController from '@applications/logics/DisplayController';
abstract class BaseApplication extends BaseAtomStore {
  abstract name: AppNames;
  abstract id: string;

  public start(): void {
    this.addApplicationInstanceToState();
  }

  public stop(): void {
    this.removeApplicationInstanceFromState();
  }

  protected isForeground(): boolean {
    const topInstance = this.storeGetAtom(
      applicationState.applicationTopInstanceAtom
    );
    if (topInstance === null || topInstance.id !== this.id) return false;
    return true;
  }

  protected isBackground(): boolean {
    return !this.isForeground();
  }

  private removeApplicationInstanceFromState() {
    const currentState = this.storeGetAtom(
      applicationState.applicationInstancesAtom
    );
    const nextState = produce(currentState, (draft) => {
      draft = draft.filter((app) => app.id !== this.id);
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

  protected print = DisplayController.getInstance().print;
  protected printUpdate = DisplayController.getInstance().printUpdate;
}

export default BaseApplication;
