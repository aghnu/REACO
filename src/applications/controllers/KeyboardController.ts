import BaseAtomStore from '@base/BaseAtomStore';
import { systemState } from '@/store';
import { handleKeydownWithDecoration, isKeyAllowed } from '@utils/keyboard';
import {
  type EventListenerContextManager,
  buildEventListenerContextManager,
} from '@utils/eventListenerWithContext';
import { produce } from 'immer';
import ApplicationController from './ApplicationController';
import HistoryController from './HistoryController';
import { type PrimitiveAtom, atom } from 'jotai';

class KeyboardController extends BaseAtomStore {
  protected static instance: KeyboardController | undefined;
  protected eventListenerContextManager: EventListenerContextManager;
  protected sideEffectTimeoutInputCursor: number | undefined;
  protected keyListners = new Map<string, Array<() => void>>();
  protected isBlur: PrimitiveAtom<boolean> = atom(false);
  protected cursorOffset: PrimitiveAtom<number> = atom(0);

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
            (prompt) => prompt.id === promptAppTop.id,
          );
          if (index === -1) return;
          const prompt = draft[index];
          prompt.input = input;
        }),
      );
    }
    this.moveCursorOffset(0);
  }

  private handleEnterKey() {
    const promptAppTop = this.storeGetAtom(systemState.promptAppTopAtom);
    const applicationController = ApplicationController.getInstance();
    const historyController = HistoryController.getInstance();

    if (promptAppTop === null) {
      const input = this.storeGetAtom(systemState.userInputAtom);
      const args = [...this.storeGetAtom(systemState.userCmdArgsAtom)];
      void applicationController.handlerInputArgs(input, args);

      this.storeSetAtom(systemState.userInputAtom, '');
      historyController.handleInputReset('userInput', input);
    } else {
      const input = promptAppTop.input;

      promptAppTop.inputListener(input);
      applicationController.updateAppPrompt(promptAppTop.id, {
        input: '',
      });
      historyController.handleInputReset(promptAppTop.id, input);
    }
    this.resetCursorOffset();
  }

  public setInput(input: string) {
    this.resetCursorOffset();
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

    // broadcast
    this.broadcastKey(key);

    // handle key
    switch (key) {
      case 'Backspace':
        this.handleDeleteKey();
        break;
      case 'Enter':
        this.handleEnterKey();
        break;
      case 'ArrowUp':
      case 'ArrowDown':
        break;
      case 'ArrowLeft':
        this.moveCursorOffset(1);
        break;
      case 'ArrowRight':
        this.moveCursorOffset(-1);
        break;
      default:
        this.handleInputKey(key);
    }
  }

  public broadcastKey(key: string) {
    const listners = this.keyListners.get(key);
    if (listners === undefined) return;
    listners.forEach((callback) => {
      callback();
    });
  }

  private handleDeleteKey() {
    const currentInput = this.inputGet();
    const deleteIndex = Math.min(
      currentInput.length - 1,
      currentInput.length - this.storeGetAtom(this.cursorOffset) - 1,
    );
    if (deleteIndex < 0) return;
    this.inputSet(
      currentInput.slice(0, deleteIndex) + currentInput.slice(deleteIndex + 1),
    );
  }

  private handleInputKey(char: string) {
    if (char.length !== 1) return;

    const cursorOffset = this.storeGetAtom(this.cursorOffset);
    const currentInput = this.inputGet();
    const insertIndex = Math.min(
      currentInput.length,
      currentInput.length - cursorOffset,
    );

    this.inputSet(
      currentInput.slice(0, insertIndex) +
        char +
        currentInput.slice(insertIndex),
    );
  }

  private moveCursorOffset(offset: number) {
    const currentInput = this.storeGetAtom(systemState.inputCurrentAtom);
    const currentOffset = this.storeGetAtom(this.cursorOffset);
    const newOffset = Math.max(
      Math.min(offset + currentOffset, currentInput.length),
      0,
    );
    this.storeSetAtom(this.cursorOffset, newOffset);
  }

  private resetCursorOffset() {
    this.storeSetAtom(this.cursorOffset, 0);
  }

  public blur() {
    this.storeSetAtom(this.isBlur, true);
    this.resetCursorOffset();
  }

  public focus() {
    this.storeSetAtom(this.isBlur, false);
    this.resetCursorOffset();
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
      handleKeydownWithDecoration(e as KeyboardEvent, ({ key }) => {
        if (this.storeGetAtom(this.isBlur)) return;
        if (!isKeyAllowed(key)) return;
        this.inputCursorPause();
        this.inputKey(key);
      });
    });
  }

  public getCursorOffsetAtom() {
    return this.cursorOffset;
  }

  public getKeyboardBlurAtom() {
    return this.isBlur;
  }
}

export default KeyboardController;
