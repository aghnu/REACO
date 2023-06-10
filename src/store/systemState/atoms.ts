import { atom } from 'jotai';
import type { PromptInfo } from '@type/SystemStateTypes';

// atoms
const userInputAtom = atom('');
const isInputCursorBlinkingAtom = atom(true);
const isVirtualKeyboardEnabledAtom = atom(false);
const promptInfoAtom = atom<PromptInfo>({
  userName: 'guest',
  systemDomain: 'aghnu.me',
  systemPath: '/',
});

export {
  promptInfoAtom,
  userInputAtom,
  isInputCursorBlinkingAtom,
  isVirtualKeyboardEnabledAtom,
};
