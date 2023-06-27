import BaseAtomStore from '@base/BaseAtomStore';
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
  protected keyListners = new Map<string, Array<() => void>>();

  protected constructor() {
    super();
    this.eventListenerContextManager = buildEventListenerContextManager();
    this.init();
  }

  public static getInstance(): KeyboardController {
    if (this.instance === undefined) this.instance = new KeyboardController();
    return this.instance;
  }

  public static destroy(): void {
    if (this.instance === undefined) return;
    this.instance.eventListenerContextManager.clear();
    this.instance.keyListners.clear();
    this.instance.storeClearSubs();
    this.instance = undefined;
  }

  private inputGet(): string {
    return this.storeGetAtom(systemState.userInputAtom);
  }

  private inputSet(input: string) {
    this.storeSetAtom(systemState.userInputAtom, input);
  }

  public subscribeKey(key: string, callback: () => void) {
    if (!isKeyAllowed(key)) return;
    const listners = this.keyListners.get(key);
    if (listners === undefined) {
      this.keyListners.set(key, [callback]);
    } else {
      listners.push(callback);
    }

    return () => {
      const listners = this.keyListners.get(key);
      if (listners === undefined) return;
      const index = listners.indexOf(callback);
      if (index === -1) return;
      listners.splice(index, 1);
    };
  }

  public inputKey(key: string) {
    if (!isKeyAllowed(key)) return;

    // handle key
    switch (key) {
      case 'Backspace':
        this.inputSet(this.inputGet().slice(0, -1));
        break;
      case 'Enter':
        break;
      default:
        this.inputSet(this.inputGet() + key);
    }

    // broadcast
    const listners = this.keyListners.get(key);
    if (listners === undefined) return;
    listners.forEach((callback) => {
      callback();
    });
  }

  public inputCursorPause() {
    window.clearTimeout(this.sideEffectTimeoutInputCursor);
    this.sideEffectTimeoutInputCursor = window.setTimeout(() => {
      this.storeSetAtom(systemState.isInputCursorBlinkingAtom, true);
    }, 250);
    this.storeSetAtom(systemState.isInputCursorBlinkingAtom, false);
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
