import { type AppName } from '@type/ApplicationTypes';
import BaseAtomStore from './BaseAtomStore';
import { applicationState } from '@store/index';
import { produce } from 'immer';
import DisplayController from '@applications/logics/DisplayController';
import ApplicationController from '@applications/logics/ApplicationController';

abstract class BaseApplication extends BaseAtomStore {
  public abstract name: AppName;
  public abstract id: string;
  protected readonly displayController = DisplayController.getInstance();
  protected readonly applicationController =
    ApplicationController.getInstance();

  public abstract start(): void;

  public stop(): void {}

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

  protected removeApplicationInstanceFromState() {
    const currentState = this.storeGetAtom(
      applicationState.applicationInstancesAtom
    );
    const nextState = produce(currentState, (draft) => {
      return draft.filter((app) => app.id !== this.id);
    });
    this.storeSetAtom(applicationState.applicationInstancesAtom, nextState);
  }

  protected addApplicationInstanceToState() {
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
}

export default BaseApplication;
