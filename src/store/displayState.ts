import { atom, useSetAtom, useAtomValue } from 'jotai';
import { withImmer } from 'jotai-immer';

interface DisplaySystemState {
  userName: string;
  systemDomain: string;
  systemPath: string;
  userInput: string;
}

// states
const displaySystemState = atom<DisplaySystemState>({
  userName: 'guest',
  systemDomain: 'aghnu.me',
  systemPath: '/',
  userInput: '',
});

// derived states
const displayPromptString = atom((get) => {
  const { userName, systemDomain, systemPath } = get(displaySystemState);
  return `${userName}@${systemDomain}:~${systemPath}`;
});

// getters

function useDisplayPromptString() {
  return useAtomValue(displayPromptString);
}

// actions
function useUpdateDisplaySystemState() {
  const setDisplaySystemState = useSetAtom(withImmer(displaySystemState));
  return (newStatePartial: Partial<DisplaySystemState>) => {
    setDisplaySystemState((state) => Object.assign(state, newStatePartial));
  };
}

export { useDisplayPromptString };
export { useUpdateDisplaySystemState };
