import { atom } from 'jotai';
import type { PromptInfo } from '@type/SystemStateTypes';
import { atomWithLocalStorage } from '@utils/helpers';

// atoms
const userInputAtom = atom('');
const isInputCursorBlinkingAtom = atom(true);
const isVirtualKeyboardEnabledAtom = atomWithLocalStorage<boolean>(
  'atom-state__is-virtual-keyboard-enabled',
  false
);
const promptInfoAtom = atom<PromptInfo>({
  userName: 'guest',
  systemDomain: 'aghnu.me',
  systemPath: '/',
});

// derived atom
const userCmdArgsAtom = atom((get) => {
  const userInput = get(userInputAtom);
  const args = userInput.split(' ').filter((a) => a !== '');
  return args;
});
const userCmdAtom = atom<string>((get) => get(userCmdArgsAtom)[0] ?? '');

export {
  promptInfoAtom,
  userInputAtom,
  isInputCursorBlinkingAtom,
  isVirtualKeyboardEnabledAtom,
  userCmdArgsAtom,
  userCmdAtom,
};
