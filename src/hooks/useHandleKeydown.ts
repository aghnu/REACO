import { useCallback } from 'react';
import { useUpdateUserInput, useBackspaceUserInput } from '@store/displayState';

// helpers
function isKeyAllowed(key: string) {
  // eslint-disable-next-line
  const regex = /^([a-zA-Z0-9\/\s]|Backspace|Enter)$/g;
  if (key.match(regex) != null) return true;
  return false;
}

function useHandleKeydown() {
  const funcKeyBackspaceInput = useBackspaceUserInput();
  const funcKeyUpdateInput = useUpdateUserInput();
  const handleKeydown = useCallback(
    (key: string) => {
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
    },
    [funcKeyBackspaceInput, funcKeyUpdateInput]
  );

  return handleKeydown;
}

export default useHandleKeydown;
