import { atom } from 'jotai';
import type { PromptInfo, PromptApp } from '@type/SystemStateTypes';
import { atomWithLocalStorage } from '@utils/helpers';

// atoms
const userInputAtom = atom('');

const isInputCursorBlinkingAtom = atom(true);
const isVirtualKeyboardEnabledAtom = atomWithLocalStorage<boolean>(
  'atom-state__is-virtual-keyboard-enabled',
  false
);
const promptAppAtom = atom<PromptApp[]>([]);
const promptInfoAtom = atom<PromptInfo>({
  userName: 'guest',
  systemDomain: 'aghnu.me',
  systemPath: '/',
});

// derived atom
const promptAppTopAtom = atom<null | PromptApp>((get) => {
  const promptApp = get(promptAppAtom);
  return promptApp.length > 0 ? promptApp[promptApp.length - 1] : null;
});
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
  promptAppAtom,
  promptAppTopAtom,
};
