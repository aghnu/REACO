import store from '@/store';
import type { Atom } from 'jotai';

abstract class BaseAtomStore {
  private readonly storeUnsubFuncs: Array<() => void> = [];
  private readonly store = store;

  protected storeSubToAtom(
    atom: Atom<unknown>,
    listner: () => void,
  ): () => void {
    const unsub = this.store.sub(atom, listner);
    this.storeUnsubFuncs.push(unsub);
    return unsub;
  }

  protected storeRemoveSub(unsub: () => void) {
    const index = this.storeUnsubFuncs.indexOf(unsub);
    if (index === -1) return;
    this.storeUnsubFuncs.splice(index, 1);
    unsub();
  }

  protected storeClearSubs() {
    while (this.storeUnsubFuncs.length > 0) {
      const unsub = this.storeUnsubFuncs.pop();
      if (unsub !== undefined) unsub();
    }
  }

  protected storeGetAtom = this.store.get;
  protected storeSetAtom = this.store.set;
}

export default BaseAtomStore;
