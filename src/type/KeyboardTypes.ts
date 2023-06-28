import {
  type KEYS_DISPLAY_LETTER,
  type KEYS_DISPLAY_LETTER_CAP,
  type KEYS_DISPLAY_SYMBOL,
} from '@utils/keyboard';

export type KeySize = 'small' | 'mid' | 'large';
export type KeyVariant = 'norm' | 'func';
export type KeySets =
  | typeof KEYS_DISPLAY_LETTER
  | typeof KEYS_DISPLAY_LETTER_CAP
  | typeof KEYS_DISPLAY_SYMBOL;
