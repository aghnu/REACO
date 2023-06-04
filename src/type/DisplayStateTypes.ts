import { type PrimitiveAtom } from 'jotai';

export interface DisplayJob {
  id: string;
  elementAtom: PrimitiveAtom<JSX.Element>;
}

export interface DisplayState {
  displayJobs: DisplayJob[];
}
