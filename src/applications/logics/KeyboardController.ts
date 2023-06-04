import BaseAtomStore from '@applications/base/BaseAtomStore';
import { systemState } from '@/store';
import { isKeyAllowed } from '@utils/keyboard';
import {
  type EventListenerContextManager,
  buildEventListenerContextManager,
} from '@utils/eventListenerWithContext';

class KeyboardController extends BaseAtomStore {
  protected static instance: KeyboardController | undefined;
  protected eventListenerContextManager: EventListenerContextManager;
  protected sideEffectTimeoutInputCursor: number | undefined;

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
    return this.storeGetAtom(systemState.userInputAtom);
  }

  private inputSet(input: string) {
    this.storeSetAtom(systemState.userInputAtom, input);
  }

  private inputConfirm() {
    const input = this.inputGet();
    this.storeSetAtom(systemState.userInputCmdRawAtom, input);
    this.inputSet('');
  }

  public inputKey(key: string) {
    if (!isKeyAllowed(key)) return;

    switch (key) {
      case 'Backspace':
        this.inputSet(this.inputGet().slice(0, -1));
        break;
      case 'Enter':
        this.inputConfirm();
        break;
      default:
        this.inputSet(this.inputGet() + key);
    }
  }

  public inputCursorPause() {
    window.clearTimeout(this.sideEffectTimeoutInputCursor);
    this.storeSetAtom(systemState.isInputCursorBlinkingAtom, false);
    this.sideEffectTimeoutInputCursor = window.setTimeout(() => {
      this.storeSetAtom(systemState.isInputCursorBlinkingAtom, true);
    }, 250);
  }

  private init() {
    this.eventListenerContextManager.set(document.body, 'keydown', (e) => {
      const key = (e as KeyboardEvent).key;
      if (!isKeyAllowed(key)) return;
      e.preventDefault();
      this.inputCursorPause();
      this.inputKey(key);
    });
  }
}

export default KeyboardController;
