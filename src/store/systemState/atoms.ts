import { atom } from 'jotai';
import type {
  PromptInfo,
  PromptApp,
  PromptHistory,
  PromptHistoryType,
} from '@type/SystemStateTypes';
import { atomWithLocalStorage, base64EncodeFuncs } from '@utils/helpers';

// atoms
const userInputAtom = atom('');

const isInputCursorBlinkingAtom = atom(true);
const isInputHighLightAtom = atom(false);
const isVirtualKeyboardEnabledAtom = atomWithLocalStorage<boolean>(
  'atom-state__is-virtual-keyboard-enabled',
  false,
  undefined,
  base64EncodeFuncs
);
const promptAppAtom = atom<PromptApp[]>([]);
const promptInfoAtom = atom<PromptInfo>({
  userName: 'guest',
  systemDomain: 'aghnu.me',
  systemPath: '/',
});
const historyAtom = atomWithLocalStorage<
  Map<PromptHistoryType, PromptHistory[]>
>(
  'atom-state__history',
  new Map(),
  {
    get: (d) => new Map(JSON.parse(d)),
    set: (d) => JSON.stringify(Array.from(d)),
  },
  base64EncodeFuncs
);

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
  isInputHighLightAtom,
  inputCurrentAtom,
  isInputCursorBlinkingAtom,
  isVirtualKeyboardEnabledAtom,
  historyCurrentPromptAtom,
  userCmdArgsAtom,
  userCmdAtom,
  promptAppAtom,
  promptAppTopAtom,
};
