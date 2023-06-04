import { atom } from 'jotai';
import type { DisplayState } from '@type/DisplayStateTypes';

// atoms
const displayStateAtom = atom<DisplayState>({
  displayJobs: [],
});

export { displayStateAtom };
