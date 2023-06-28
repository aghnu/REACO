import type { KeySize, KeyVariant, KeySets } from '@type/KeyboardTypes';

export const KEYS_DISPLAY_LETTER = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['UPPER', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'Backspace'],
  ['?123', ',', ' ', 'Enter'],
] as const;

export const KEYS_DISPLAY_LETTER_CAP = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['LOWER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'Backspace'],
  ['?123', ',', ' ', 'Enter'],
] as const;

export const KEYS_DISPLAY_SYMBOL = [
  ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
  ['@', '#', '$', '_', '&', '-', '+', '(', ')'],
  ['*', '"', "'", ':', ';', '!', '?', '/', 'Backspace'],
  ['ABC', ',', ' ', 'Enter'],
] as const;

const KEYS_ALL = (() => {
  return [
    ...KEYS_DISPLAY_LETTER.reduce<string[]>((acum, keys) => {
      return [...acum, ...keys];
    }, []),
    ...KEYS_DISPLAY_SYMBOL.reduce<string[]>((acum, keys) => {
      return [...acum, ...keys];
    }, []),
    ...KEYS_DISPLAY_LETTER_CAP.reduce<string[]>((acum, keys) => {
      return [...acum, ...keys];
    }, []),
  ];
})();

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
    'UPPER',
    'LOWER',
  ];

  if (keyLarge.includes(key)) return 'large';
  if (keyMid.includes(key)) return 'mid';
  return 'small';
}

export function getKeyVariant(key: string): KeyVariant {
  const keyFunc = [
    ' ',
    'Backspace',
    'Enter',
    '?123',
    'ABC',
    ',',
    'UPPER',
    'LOWER',
  ];

  if (keyFunc.includes(key)) return 'func';
  return 'norm';
}

export function getKeyLabel(key: string): string {
  if (key === 'Backspace') return 'Back';
  if (key === ' ') return 'Space';
  return key;
}

export function getKeyHandler(
  key: string,
  setKeySet: (keySets: KeySets) => void,
  defaultHandler: () => void
): () => void {
  if (key === 'ABC')
    return () => {
      setKeySet(KEYS_DISPLAY_LETTER);
    };

  if (key === '?123')
    return () => {
      setKeySet(KEYS_DISPLAY_SYMBOL);
    };

  if (key === 'UPPER')
    return () => {
      setKeySet(KEYS_DISPLAY_LETTER_CAP);
    };

  if (key === 'LOWER')
    return () => {
      setKeySet(KEYS_DISPLAY_LETTER);
    };

  return defaultHandler;
}
