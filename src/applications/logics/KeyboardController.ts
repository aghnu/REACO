import BaseAtomStore from '@applications/base/BaseAtomStore';
import { userInputAtom } from '@store/displayState';
import { isKeyAllowed } from '@utils/keyboard';
import {
  type EventListenerContextManager,
  buildEventListenerContextManager,
} from '@utils/eventListenerWithContext';

class KeyboardController extends BaseAtomStore {
  protected static instance: KeyboardController | undefined;
  protected eventListenerContextManager: EventListenerContextManager;

  protected constructor() {
    super();
    this.eventListenerContextManager = buildEventListenerContextManager();
    this.init();
  }

  public static getInstance(): KeyboardController {
    if (this.instance === undefined) this.instance = new KeyboardController();
    return this.instance;
  }

  public static start() {
    KeyboardController.getInstance();
  }

  public destroy(): void {
    KeyboardController.instance = undefined;
    this.eventListenerContextManager.clear();
    this.storeClearSubs();
  }

  private inputGet(): string {
    return this.storeGetAtom(userInputAtom);
  }

  private inputSet(input: string): void {
    this.storeSetAtom(userInputAtom, input);
  }

  public inputKey(key: string) {
    if (!isKeyAllowed(key)) return;

    switch (key) {
      case 'Backspace':
        this.inputSet(this.inputGet().slice(0, -1));
        break;
      case 'Enter':
        this.inputSet(this.inputGet().slice(0, -1));
        break;
      default:
        this.inputSet(this.inputGet() + key);
    }
  }

  private init() {
    this.eventListenerContextManager.set(document.body, 'keydown', (e) => {
      const key = (e as KeyboardEvent).key;
      if (!isKeyAllowed(key)) return;
      e.preventDefault();
      this.inputKey(key);
    });
  }
}

export default KeyboardController;
