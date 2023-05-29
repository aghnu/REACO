import { atom, useSetAtom, useAtomValue } from 'jotai';
import { withImmer } from 'jotai-immer';

interface systemState {
  virtualKeyboardEnabled: boolean;
}

// atoms
const systemStateAtom = atom<systemState>({
  virtualKeyboardEnabled: false,
});

// derived atoms
const isVirtualKeyboardEnabledAtom = atom(
  (get) => get(systemStateAtom).virtualKeyboardEnabled
);

// getter
function useIsVirtualKeyboardEnabled() {
  return useAtomValue(isVirtualKeyboardEnabledAtom);
}

// actions
function useToggleVirtualKeyboard() {
  const setSystemStateAtom = useSetAtom(withImmer(systemStateAtom));
  return () => {
    setSystemStateAtom((draft) => {
      draft.virtualKeyboardEnabled = !draft.virtualKeyboardEnabled;
    });
  };
}

function useControlVirtualKeyboard() {
  const setSystemStateAtom = useSetAtom(withImmer(systemStateAtom));
  return (state: boolean) => {
    setSystemStateAtom((draft) => {
      draft.virtualKeyboardEnabled = state;
    });
  };
}

export { systemStateAtom, isVirtualKeyboardEnabledAtom };
export { useIsVirtualKeyboardEnabled };
export { useToggleVirtualKeyboard, useControlVirtualKeyboard };
