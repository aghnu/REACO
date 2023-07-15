import BaseAtomStore from '@base/BaseAtomStore';
import { systemState } from '@store/index';
import { produce } from 'immer';
import { type PromptHistoryType } from '@type/SystemStateTypes';
import KeyboardController from './KeyboardController';

class HistoryController extends BaseAtomStore {
  protected static instance: HistoryController | undefined;
  private historySelectIdx: number | null = null;
  private cleanFunc: (() => void) | undefined;
  private sideEffectTimeoutInputBlink: number | undefined;

  protected constructor() {
    super();
    this.init();
  }

  public static getInstance(): HistoryController {
    if (this.instance === undefined) this.instance = new HistoryController();
    return this.instance;
  }

  public static destroy(): void {
    if (this.instance === undefined) return;
    if (this.instance.cleanFunc !== undefined) this.instance.cleanFunc();
    this.instance = undefined;
  }

  private init() {
    const unSubFuncs = [
      KeyboardController.getInstance().subscribeKey('ArrowUp', () => {
        this.handlePrevHistory();
      }),
      KeyboardController.getInstance().subscribeKey('ArrowDown', () => {
        this.handleNextHistory();
      }),
    ];
    this.cleanFunc = () => {
      unSubFuncs.forEach((f) => {
        if (f !== undefined) f();
      });
    };
  }

  private handlePrevHistory() {
    const userInputCurrent = this.storeGetAtom(systemState.inputCurrentAtom);
    const historyCurrentPrompt = this.storeGetAtom(
      systemState.historyCurrentPromptAtom,
    );
    const index =
      this.historySelectIdx === null ? 0 : this.historySelectIdx + 1;
    const historyPrompt =
      historyCurrentPrompt[historyCurrentPrompt.length - index - 1];
    if (
      historyPrompt === undefined ||
      (this.historySelectIdx === null && userInputCurrent !== '')
    ) {
      this.blinkInput();
      return;
    }

    // set prompt
    KeyboardController.getInstance().setInput(historyPrompt.promptMessage);
    this.historySelectIdx = index;
  }

  private handleNextHistory() {
    // special cases
    if (this.historySelectIdx === null) {
      this.blinkInput();
      return;
    }
    if (this.historySelectIdx === 0) {
      KeyboardController.getInstance().setInput('');
      this.historySelectIdx = null;
      return;
    }

    const historyCurrentPrompt = this.storeGetAtom(
      systemState.historyCurrentPromptAtom,
    );
    const index = this.historySelectIdx - 1;
    const historyPrompt =
      historyCurrentPrompt[historyCurrentPrompt.length - index - 1];
    if (historyPrompt === undefined) return;

    // set prompt
    KeyboardController.getInstance().setInput(historyPrompt.promptMessage);
    this.historySelectIdx = index;
  }

  public handleInputReset(type: PromptHistoryType, message: string) {
    if (this.historySelectIdx === null || message === '') {
      this.historySelectIdx = null;
      this.saveHistory(type, message);
      return;
    }

    const historyPromptMap = this.storeGetAtom(systemState.historyAtom);
    const historyPrompt = historyPromptMap.get(type);
    if (historyPrompt === undefined) return;

    const indexToRemove = historyPrompt.length - this.historySelectIdx - 1;
    this.storeSetAtom(
      systemState.historyAtom,
      produce(historyPromptMap, (draft) => {
        draft.set(
          type,
          historyPrompt.filter((_, i) => i !== indexToRemove),
        );
        return draft;
      }),
    );

    // save
    this.historySelectIdx = null;
    this.saveHistory(type, message);
  }

  private saveHistory(type: PromptHistoryType, message: string) {
    if (message === '') return;
    const currentState = this.storeGetAtom(systemState.historyAtom);
    this.storeSetAtom(
      systemState.historyAtom,
      produce(currentState, (draft) => {
        const quene = draft.get(type) ?? [];
        const dupIndex = quene.findIndex((e) => e.promptMessage === message);
        if (dupIndex !== -1) quene.splice(dupIndex, 1);

        quene.push({
          promptMessage: message,
          promptType: type,
        });
        draft.set(type, quene);
        return draft;
      }),
    );
  }

  public clear() {
    this.storeSetAtom(systemState.historyAtom, new Map());
  }

  private blinkInput() {
    window.clearTimeout(this.sideEffectTimeoutInputBlink);
    this.sideEffectTimeoutInputBlink = window.setTimeout(() => {
      this.storeSetAtom(systemState.isInputHighLightAtom, false);
    }, 100);
    this.storeSetAtom(systemState.isInputHighLightAtom, true);
  }
}

export default HistoryController;
