import { useEffect } from 'react';
import { useUpdateUserInput, useBackspaceUserInput } from '@store/displayState';

// func declaration
let funcKeyBackspaceInput: () => void;
let funcKeyUpdateInput: (input: string) => void;

// helpers
function isKeyAllowed(key: string) {
  // eslint-disable-next-line
  const regex = /^([a-zA-Z0-9\/\s]|Backspace|Enter)$/g;
  if (key.match(regex) != null) return true;
  return false;
}

function handleKeydown(e: KeyboardEvent) {
  const key = e.key;
  if (!isKeyAllowed(key)) return;

  // special keys
  if (key === 'Backspace') {
    funcKeyBackspaceInput();
    return;
  }
  if (key === 'Enter') {
    funcKeyBackspaceInput();
    return;
  }

  // normal keys
  funcKeyUpdateInput(key);
  e.preventDefault();
}

// hook
function useStartKeyboardInput() {
  funcKeyBackspaceInput = useBackspaceUserInput();
  funcKeyUpdateInput = useUpdateUserInput();

  useEffect(() => {
    document.addEventListener('keydown', handleKeydown);

    return () => {
      document.removeEventListener('keydown', handleKeydown);
    };
  }, []);
}

export default useStartKeyboardInput;
