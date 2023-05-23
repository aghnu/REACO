import { useCallback, useEffect } from 'react';
import useHandleKeydown from '@hooks/useHandleKeydown';

// hook
function useStartKeyboardInput() {
  const handleKeydown = useHandleKeydown();
  const handleKeyDownEvent = useCallback(
    (e: KeyboardEvent) => {
      handleKeydown(e.key);
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
