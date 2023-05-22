import { atom, useSetAtom, useAtomValue, type PrimitiveAtom } from 'jotai';
import { splitAtom } from 'jotai/utils';
import { focusAtom } from 'jotai-optics';
import { type AppState } from '@type/DisplayTypes';

interface PromptInfo {
  userName: string;
  systemDomain: string;
  systemPath: string;
}

interface DisplayAppState {
  apps: AppState[];
}

// atoms
const promptInfoAtom = atom<PromptInfo>({
  userName: 'guest',
  systemDomain: 'aghnu.me',
  systemPath: '/',
});
const userInputAtom = atom<string>('');
const displayAppStateAtom = atom<DisplayAppState>({
  apps: [],
});

// derived atoms
const appStateAtom = focusAtom(displayAppStateAtom, (optics) =>
  optics.prop('apps')
) as PrimitiveAtom<AppState[]>;
const appStateAtomsAtom = splitAtom(appStateAtom);

// getters
function useUserInput() {
  return useAtomValue(userInputAtom);
}

function usePromptInfo() {
  return useAtomValue(promptInfoAtom);
}

// actions
function useBackspaceUserInput() {
  const setUserInput = useSetAtom(userInputAtom);
  return () => {
    setUserInput((prev) => prev.slice(0, -1));
  };
}

function useUpdateUserInput() {
  const setUserInput = useSetAtom(userInputAtom);
  return (input: string) => {
    setUserInput((prev) => prev + input);
  };
}

export {
  promptInfoAtom,
  userInputAtom,
  displayAppStateAtom,
  appStateAtomsAtom,
};
export { usePromptInfo, useUserInput };
export { useBackspaceUserInput, useUpdateUserInput };
