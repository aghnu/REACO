/* eslint-disable prettier/prettier */
export const KEYS_DISPLAY_LETTER = {
  mobile: [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', '/'],
    ['Upper', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'Backspace'],
    ['?123', ',', ' ', 'Enter'],
  ] as const,
  desktop: [
    ['q', 'w', 'e', 'r', 't'],        ['y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g'],        ['h', 'j', 'k', 'l', '/'],
    ['Upper', 'z', 'x', 'c', 'v'],    ['b', 'n', 'm', ',', 'Backspace'],
    ['?123', ' '],                    [' ', 'Enter'],
  ] as const,
};

export const KEYS_DISPLAY_LETTER_CAP = {
  mobile: [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', '/'],
    ['Lower', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'Backspace'],
    ['?123', ',', ' ', 'Enter'],
  ] as const,
  desktop: [
    ['Q', 'W', 'E', 'R', 'T'],        ['Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G'],        ['H', 'J', 'K', 'L', '/'],
    ['Lower', 'Z', 'X', 'C', 'V'],    ['B', 'N', 'M', ',', 'Backspace'],
    ['?123', ' '],                    [' ', 'Enter'],
  ] as const,
};

export const KEYS_DISPLAY_SYMBOL = {
  mobile: [
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
    ['@', '#', '$', '_', '&', '-', '+', '(', ')', '.'],
    ['*', '^', "'", ':', ';', '!', '?', '\\', 'Backspace'],
    ['ABC', ',', ' ', 'Enter'],
  ] as const,
  desktop: [
    ['1', '2', '3', '4', '5'],        ['6', '7', '8', '9', '0'],
    ['@', '#', '$', '_', '&'],        ['-', '+', '(', ')', '.'],
    ['*', '^', "'", ':', ';'],        ['!', '?', '\\', ',', 'Backspace'],
    ['ABC', ' '],                     [' ', 'Enter'],
  ] as const,
};

export const KEYS_ALLOWED_ADDITIONAL = [
  ['%', '"', '=', '|', '`', '~'],
  ['{', '}', '[', ']', '<', '>'],
  ['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight'],
];

export const KEYS_PREVENT_DEFAULT = [
  ['/', "'"],
  ['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight'],
  ['Tab'],
];
/* eslint-enable prettier/prettier */

export const KEYS_ALL = (() => {
  return [
    ...KEYS_DISPLAY_LETTER.mobile.flat(),
    ...KEYS_DISPLAY_SYMBOL.mobile.flat(),
    ...KEYS_DISPLAY_LETTER_CAP.mobile.flat(),
    ...KEYS_ALLOWED_ADDITIONAL.flat(),
  ];
})();
