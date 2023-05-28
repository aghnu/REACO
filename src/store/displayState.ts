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
const isInputCursorBlinkingAtom = atom(true);
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

function useIsInputCursorBlinking() {
  return useAtomValue(isInputCursorBlinkingAtom);
}

// actions
function useBackspaceUserInput() {
  const setUserInput = useSetAtom(userInputAtom);
  const pauseInputCursorBlinking = usePauseInputCursorBlinking();
  return () => {
    setUserInput((prev) => prev.slice(0, -1));
    pauseInputCursorBlinking();
  };
}

function useUpdateUserInput() {
  const setUserInput = useSetAtom(userInputAtom);
  const pauseInputCursorBlinking = usePauseInputCursorBlinking();
  return (input: string) => {
    setUserInput((prev) => prev + input);
    pauseInputCursorBlinking();
  };
}

let sideEffectTimeoutInputCursor: number | undefined;
function usePauseInputCursorBlinking() {
  const setIsInputCursorBlinkingAtom = useSetAtom(isInputCursorBlinkingAtom);
  return () => {
    window.clearTimeout(sideEffectTimeoutInputCursor);
    setIsInputCursorBlinkingAtom(false);
    sideEffectTimeoutInputCursor = window.setTimeout(() => {
      setIsInputCursorBlinkingAtom(true);
    }, 250);
  };
}

export {
  promptInfoAtom,
  userInputAtom,
  displayAppStateAtom,
  appStateAtomsAtom,
  isInputCursorBlinkingAtom,
};
export { usePromptInfo, useUserInput, useIsInputCursorBlinking };
export {
  useBackspaceUserInput,
  useUpdateUserInput,
  usePauseInputCursorBlinking,
};
