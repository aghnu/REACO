import { atom } from 'jotai';
import { breakpoints } from '@config/breakpoints';
import { type BreakpointName, type Breakpoints } from '@type/BreakpointTypes';
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
const breakpointAtom = atom<BreakpointName>((get) => {
  const width = get(desktopWidthAtom);
  if (width === 0) return '--bp-init';

  const bps = (Object.keys(breakpoints) as Array<keyof Breakpoints>).sort(
    (a, b) => breakpoints[a] - breakpoints[b]
  );
  return bps.find((bp) => width <= breakpoints[bp]) ?? '--bp-infinity';
});

export {
  desktopWidthAtom,
  desktopHeightAtom,
  breakpointAtom,
  displayThemeMode,
};
