import { atom, useSetAtom, useAtomValue } from 'jotai';

interface PromptInfo {
  userName: string;
  systemDomain: string;
  systemPath: string;
}

// atoms
const promptInfoAtom = atom<PromptInfo>({
  userName: 'guest',
  systemDomain: 'aghnu.me',
  systemPath: '/',
});
const userInputAtom = atom<string>('');

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

export { promptInfoAtom, userInputAtom };
export { usePromptInfo, useUserInput };
export { useBackspaceUserInput, useUpdateUserInput };
