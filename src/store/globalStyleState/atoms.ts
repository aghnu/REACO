import { atom } from 'jotai';
import { breakpoints } from '@config/breakpoints';
import { type BreakpointName } from '@type/BreakpointTypes';
import { type DisplayThemeMode } from '@type/GlobalStyleTypes';
import { atomWithLocalStorage } from '@utils/helpers';

// atoms
const desktopWidthAtom = atom(0);
const desktopHeightAtom = atom(0);
const displayThemeMode = atomWithLocalStorage<DisplayThemeMode>(
  'atom-state__display-theme-mode',
  'light'
);

// derived atoms
const breakpointAtom = atom((get) => {
  const width = get(desktopWidthAtom);
  const bps = (Object.keys(breakpoints) as BreakpointName[]).sort(
    (a, b) => breakpoints[a] - breakpoints[b]
  );

  return bps.find((bp) => width <= breakpoints[bp]) ?? null;
});

export {
  desktopWidthAtom,
  desktopHeightAtom,
  breakpointAtom,
  displayThemeMode,
};
