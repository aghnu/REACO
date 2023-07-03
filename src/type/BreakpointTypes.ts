export interface Breakpoints {
  '--bp-narrower': number;
  '--bp-narrow': number;
  '--bp-wide': number;
}

export type BreakpointName = keyof Breakpoints;
