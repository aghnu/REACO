export interface Breakpoints {
  '--bp-narrower': number;
  '--bp-narrow': number;
}

export type BreakpointName = keyof Breakpoints;
