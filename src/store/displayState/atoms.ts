import { type PrimitiveAtom, atom } from 'jotai';
import { focusAtom } from 'jotai-optics';
import type { DisplayState } from '@type/DisplayStateTypes';
import { addLabelToAtom } from '@utils/helpers';

// atoms
const displayStateAtom = atom<DisplayState>({
  displayJobs: [],
});

// derived atoms
const displayJobsAtom = addLabelToAtom(
  'displayJobsAtom',
  focusAtom(displayStateAtom, (optic) =>
    optic.prop('displayJobs')
  ) as PrimitiveAtom<DisplayState['displayJobs']>
);
export { displayStateAtom, displayJobsAtom };
