import BaseAtomStore from '@base/BaseAtomStore';
import { displayState } from '@/store';
import { produce } from 'immer';
import { v4 as uuid } from 'uuid';
import { atom } from 'jotai';
import KeyboardController from './KeyboardController';
import type { PrintJobType, PrintJob } from '@type/ApplicationTypes';

class DisplayController extends BaseAtomStore {
  protected static instance: DisplayController | undefined;
  protected printJobsQuene: PrintJob[] = [];
  protected printJobsTimeout: number | undefined = undefined;

  protected constructor() {
    super();
  }

  public static getInstance(): DisplayController {
    if (this.instance === undefined) this.instance = new DisplayController();
    return this.instance;
  }

  public destroy(): void {
    DisplayController.instance = undefined;
    this.storeClearSubs();
    this.printClear();
    this.resetConsumePrintJob();
  }

  public static start() {
    DisplayController.getInstance();
  }

  private resetConsumePrintJob() {
    this.stopConsumePrintJob();
    this.printJobsQuene = [];
  }

  private startConsumePrintJob() {
    this.printJobsTimeout = window.setTimeout(() => {
      const job = this.printJobsQuene.shift();
      if (job !== undefined) {
        job.type === 'print' &&
          KeyboardController.getInstance().inputCursorPause();
        job.callback();
      }
      if (this.printJobsQuene.length > 0) this.startConsumePrintJob();
    }, Math.floor(Math.random() * 15) + 15);
  }

  private stopConsumePrintJob() {
    window.clearTimeout(this.printJobsTimeout);
  }

  private addPrintJob(type: PrintJobType, callback: () => void) {
    this.stopConsumePrintJob();
    this.printJobsQuene.push({ type, callback });
    this.startConsumePrintJob();
  }

  public print(element: JSX.Element): string {
    const id = uuid();
    this.addPrintJob('print', () => {
      const currentState = this.storeGetAtom(displayState.displayJobsAtom);
      const nextState = produce(currentState, (draft) => {
        draft.push({ id, elementAtom: atom(element) });
      });
      this.storeSetAtom(displayState.displayJobsAtom, nextState);
    });
    return id;
  }

  public printUpdate(id: string, element: JSX.Element): void {
    this.addPrintJob('update', () => {
      const state = this.storeGetAtom(displayState.displayJobsAtom);
      const index = state.findIndex((job) => job.id === id);
      if (index === -1) return;
      this.storeSetAtom(state[index].elementAtom, element);
    });
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
    this.resetConsumePrintJob();
    this.storeSetAtom(displayState.displayJobsAtom, []);
  }
}

export default DisplayController;
