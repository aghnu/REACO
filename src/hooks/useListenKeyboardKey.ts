import { handleKeydownWithDecoration } from '@utils/keyboard';
import { useEffect } from 'react';

function useListenKeyboardKey(key: string, listner: () => void) {
  useEffect(() => {
    const keydownHandler = (e: KeyboardEvent) => {
      handleKeydownWithDecoration(e, ({ event }) => {
        if (key === event.key) listner();
      });
    };
    document.addEventListener('keydown', keydownHandler);

    return () => {
      document.removeEventListener('keydown', keydownHandler);
    };
  }, [key, listner]);
}

export default useListenKeyboardKey;
