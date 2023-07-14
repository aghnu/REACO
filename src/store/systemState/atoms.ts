import { atom } from 'jotai';
import type {
  PromptInfo,
  PromptApp,
  PromptHistory,
  PromptHistoryType,
} from '@type/SystemStateTypes';
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
const historyAtom = atom<Map<PromptHistoryType, PromptHistory[]>>(new Map());

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
const historyCurrentPromptAtom = atom<PromptHistory[]>((get) => {
  const promptApp = get(promptAppAtom);
  const historyMap = get(historyAtom);
  if (promptApp.length > 0) {
    const prompAppTop = promptApp[promptApp.length - 1];
    return historyMap.get(prompAppTop.id) ?? [];
  }
  return historyMap.get('userInput') ?? [];
});
const inputCurrentAtom = atom<string>((get) => {
  const userInput = get(userInputAtom);
  const promptApp = get(promptAppAtom);
  return promptApp.length > 0 ? promptApp[0].input : userInput;
});

export {
  promptInfoAtom,
  userInputAtom,
  historyAtom,
  inputCurrentAtom,
  isInputCursorBlinkingAtom,
  isVirtualKeyboardEnabledAtom,
  historyCurrentPromptAtom,
  userCmdArgsAtom,
  userCmdAtom,
  promptAppAtom,
  promptAppTopAtom,
};
