import { atom, useSetAtom } from 'jotai';
import { withImmer } from 'jotai-immer';

interface systemState {
  virtualKeyboardEnabled: boolean;
}

// atoms
const systemStateAtom = atom<systemState>({
  virtualKeyboardEnabled: false,
});

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

export { systemStateAtom };
export { useToggleVirtualKeyboard, useControlVirtualKeyboard };
