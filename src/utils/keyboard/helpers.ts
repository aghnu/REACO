import type { KeySize, KeyVariant, KeySetsSet } from '@type/KeyboardTypes';
import {
  KEYS_DISPLAY_LETTER,
  KEYS_DISPLAY_LETTER_CAP,
  KEYS_DISPLAY_SYMBOL,
  KEYS_PREVENT_DEFAULT,
  KEYS_ALL,
  KEYS_SKIP_INPUT,
} from './constants';
import { isKeyDown } from './globalKeyHandling';

export function isKeyAllowed(key: string) {
  return KEYS_ALL.includes(key);
}

export function getKeySize(key: string): KeySize {
  const keyLarge = [' '];
  const keyMid = [
    'Backspace',
    'Enter',
    '?123',
    'ABC',
    ',',
    '*',
    'Upper',
    'Lower',
  ];

  if (keyLarge.includes(key)) return 'large';
  if (keyMid.includes(key)) return 'mid';
  return 'small';
}

export function getKeyVariant(key: string): KeyVariant {
  const keyFunc = [' ', 'Backspace', 'Enter', '?123', 'ABC', 'Upper', 'Lower'];

  if (keyFunc.includes(key)) return 'func';
  return 'norm';
}

export function getKeyLabel(key: string): string {
  if (key === 'Backspace') return 'Back';
  if (key === ' ') return 'Space';
  return key;
}

export function getShortLabel(key: string): string {
  if (key === 'Backspace') return 'Ba';
  if (key === 'Upper') return 'Up';
  if (key === 'Lower') return 'Lo';
  if (key === 'Enter') return 'En';
  if (key === '?123') return '!?';
  if (key === 'ABC') return 'Aa';

  return getKeyLabel(key);
}

let lockTempFuncLock: boolean = false;
function lockTempFunc(callback: () => void) {
  if (lockTempFuncLock) return;
  lockTempFuncLock = true;
  callback();
  window.setTimeout(() => {
    lockTempFuncLock = false;
  }, 100);
}

export function getKeyHandler(
  key: string,
  setKeySet: (keySetsSet: KeySetsSet) => void,
  defaultHandler: () => void,
): () => void {
  if (key === 'ABC')
    return () => {
      lockTempFunc(() => {
        setKeySet(KEYS_DISPLAY_LETTER);
      });
    };

  if (key === '?123')
    return () => {
      lockTempFunc(() => {
        setKeySet(KEYS_DISPLAY_SYMBOL);
      });
    };

  if (key === 'Upper')
    return () => {
      lockTempFunc(() => {
        setKeySet(KEYS_DISPLAY_LETTER_CAP);
      });
    };

  if (key === 'Lower')
    return () => {
      lockTempFunc(() => {
        setKeySet(KEYS_DISPLAY_LETTER);
      });
    };

  return defaultHandler;
}

export function getIsAllowHold(key: string) {
  const keyNotAllowHold = ['?123', 'ABC', 'Upper', 'Lower'];
  if (keyNotAllowHold.includes(key)) return false;
  return true;
}

export function preventKeyDefaultSelective(e: KeyboardEvent) {
  if (KEYS_PREVENT_DEFAULT.flat().includes(e.key)) {
    e.preventDefault();
  }
}

// decorate keydown event
export function handleKeydownWithDecoration(
  e: KeyboardEvent,
  handlerFunc: ({ key, event }: { key: string; event: KeyboardEvent }) => void,
) {
  if (isKeyDown(KEYS_SKIP_INPUT.flat())) return;
  preventKeyDefaultSelective(e);
  handlerFunc({ key: e.key, event: e });
}
