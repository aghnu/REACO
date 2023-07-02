import BaseAtomStore from '@base/BaseAtomStore';
import { systemState } from '@/store';
import { isKeyAllowed } from '@utils/keyboard';
import {
  type EventListenerContextManager,
  buildEventListenerContextManager,
} from '@utils/eventListenerWithContext';
import { produce } from 'immer';

class KeyboardController extends BaseAtomStore {
  protected static instance: KeyboardController | undefined;
  protected eventListenerContextManager: EventListenerContextManager;
  protected sideEffectTimeoutInputCursor: number | undefined;
  protected keyListners = new Map<string, Array<() => void>>();
  protected isBlur: boolean = false;

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
    const promptAppTop = this.storeGetAtom(systemState.promptAppTopAtom);
    if (promptAppTop === null)
      return this.storeGetAtom(systemState.userInputAtom);
    return promptAppTop.input;
  }

  private inputSet(input: string) {
    const promptAppTop = this.storeGetAtom(systemState.promptAppTopAtom);
    if (promptAppTop === null) {
      this.storeSetAtom(systemState.userInputAtom, input);
    } else {
      this.storeSetAtom(
        systemState.promptAppAtom,
        produce(this.storeGetAtom(systemState.promptAppAtom), (draft) => {
          const index = draft.findIndex(
            (prompt) => prompt.id === promptAppTop.id
          );
          if (index === -1) return;
          const prompt = draft[index];
          prompt.input = input;
        })
      );
    }
  }

  public setInput(input: string) {
    this.inputSet(input);
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
    this.broadcastKey(key);
  }

  public broadcastKey(key: string) {
    const listners = this.keyListners.get(key);
    if (listners === undefined) return;
    listners.forEach((callback) => {
      callback();
    });
  }

  public blur() {
    this.isBlur = true;
  }

  public focus() {
    this.isBlur = false;
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
      if (this.isBlur) return;
      if (!isKeyAllowed(key)) return;
      e.preventDefault();
      this.inputCursorPause();
      this.inputKey(key);
    });
  }
}

export default KeyboardController;
