import BaseAtomStore from '@base/BaseAtomStore';
import { displayState } from '@/store';
import { produce } from 'immer';
import { v4 as uuid } from 'uuid';
import { atom } from 'jotai';

class DisplayController extends BaseAtomStore {
  protected static instance: DisplayController | undefined;

  protected constructor() {
    super();
    this.init();
  }

  public static getInstance(): DisplayController {
    if (this.instance === undefined) this.instance = new DisplayController();
    return this.instance;
  }

  public destroy(): void {
    DisplayController.instance = undefined;
    this.storeClearSubs();
  }

  public static start() {
    DisplayController.getInstance();
  }

  private init() {}

  public print(element: JSX.Element): string {
    const id = uuid();
    const currentState = this.storeGetAtom(displayState.displayJobsAtom);
    const nextState = produce(currentState, (draft) => {
      draft.push({ id, elementAtom: atom(element) });
    });
    this.storeSetAtom(displayState.displayJobsAtom, nextState);
    return id;
  }

  public printUpdate(id: string, element: JSX.Element): void {
    const state = this.storeGetAtom(displayState.displayJobsAtom);
    const index = state.findIndex((job) => job.id === id);
    if (index === -1) return;
    this.storeSetAtom(state[index].elementAtom, element);
  }

  public printRemove(id: string): void {
    const currentState = this.storeGetAtom(displayState.displayJobsAtom);
    const index = currentState.findIndex((job) => job.id === id);
    if (index === -1) return;

    // remove then update state
    const nextState = produce(currentState, (draft) => {
      draft.splice(index, 1);
    });
    this.storeSetAtom(displayState.displayJobsAtom, nextState);
  }

  public printClear(): void {
    this.storeSetAtom(displayState.displayJobsAtom, []);
  }
}

export default DisplayController;
