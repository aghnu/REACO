import { useCallback } from 'react';
import { useUpdateUserInput, useBackspaceUserInput } from '@store/displayState';
import { isKeyAllowed } from '@utils/helpers';

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
