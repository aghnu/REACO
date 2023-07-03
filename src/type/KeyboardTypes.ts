import {
  type KEYS_DISPLAY_LETTER,
  type KEYS_DISPLAY_LETTER_CAP,
  type KEYS_DISPLAY_SYMBOL,
} from '@utils/keyboard';

export type KeySize = 'small' | 'mid' | 'large';
export type KeyVariant = 'norm' | 'func';
export type KeySetsDesktop =
  | (typeof KEYS_DISPLAY_LETTER)['desktop']
  | (typeof KEYS_DISPLAY_LETTER_CAP)['desktop']
  | (typeof KEYS_DISPLAY_SYMBOL)['desktop'];
export type KeySetsMobile =
  | (typeof KEYS_DISPLAY_LETTER)['mobile']
  | (typeof KEYS_DISPLAY_LETTER_CAP)['mobile']
  | (typeof KEYS_DISPLAY_SYMBOL)['mobile'];
export type KeySetsSet =
  | typeof KEYS_DISPLAY_LETTER
  | typeof KEYS_DISPLAY_LETTER_CAP
  | typeof KEYS_DISPLAY_SYMBOL;
