import { useCallback, useEffect } from 'react';
import useHandleKeydown from '@hooks/useHandleKeydown';
import { isKeyAllowed } from '@utils/helpers';

// hook
function useStartKeyboardInput() {
  const handleKeydown = useHandleKeydown();
  const handleKeyDownEvent = useCallback(
    (e: KeyboardEvent) => {
      handleKeydown(e.key);

      // if key is used by app then prevent default behavior
      if (isKeyAllowed(e.key)) e.preventDefault();
    },
    [handleKeydown]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDownEvent);

    return () => {
      document.removeEventListener('keydown', handleKeyDownEvent);
    };
  }, [handleKeyDownEvent]);
}

export default useStartKeyboardInput;
