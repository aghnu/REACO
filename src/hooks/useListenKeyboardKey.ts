import { useEffect } from 'react';

function useListenKeyboardKey(key: string, listner: () => void) {
  useEffect(() => {
    const keydownHandler = (e: KeyboardEvent) => {
      if (key === e.key) {
        e.preventDefault();
        listner();
      }
    };
    document.addEventListener('keydown', keydownHandler);

    return () => {
      document.removeEventListener('keydown', keydownHandler);
    };
  }, [key, listner]);
}

export default useListenKeyboardKey;
