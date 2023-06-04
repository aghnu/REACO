import BaseAtomStore from '@base/BaseAtomStore';
import { displayState } from '@/store';
import { produce } from 'immer';
import { v4 as uuid } from 'uuid';

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

  public print(element: JSX.Element) {
    const currentState = this.storeGetAtom(displayState.displayJobsAtom);
    const nextState = produce(currentState, (draft) => {
      draft.push({
        id: uuid(),
        element,
      });
    });
    this.storeSetAtom(displayState.displayJobsAtom, nextState);
  }
}

export default DisplayController;
