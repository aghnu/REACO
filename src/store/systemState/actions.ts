import { useSetAtom } from 'jotai';
import {
  userInputAtom,
  isInputCursorBlinkingAtom,
  isVirtualKeyboardEnabledAtom,
} from '.';

// side effects
let sideEffectTimeoutInputCursor: number | undefined;

// actions
function usePauseInputCursorBlinking() {
  const setIsInputCursorBlinkingAtom = useSetAtom(isInputCursorBlinkingAtom);
  return () => {
    window.clearTimeout(sideEffectTimeoutInputCursor);
    setIsInputCursorBlinkingAtom(false);
    sideEffectTimeoutInputCursor = window.setTimeout(() => {
      setIsInputCursorBlinkingAtom(true);
    }, 250);
  };
}

function useBackspaceUserInput() {
  const setUserInput = useSetAtom(userInputAtom);
  const pauseInputCursorBlinking = usePauseInputCursorBlinking();
  return () => {
    setUserInput((prev) => prev.slice(0, -1));
    pauseInputCursorBlinking();
  };
}

function useUpdateUserInput() {
  const setUserInput = useSetAtom(userInputAtom);
  const pauseInputCursorBlinking = usePauseInputCursorBlinking();
  return (input: string) => {
    setUserInput((prev) => prev + input);
    pauseInputCursorBlinking();
  };
}

function useToggleVirtualKeyboard() {
  const setIsVirtualKeyboardEnabledAtom = useSetAtom(
    isVirtualKeyboardEnabledAtom
  );
  return () => {
    setIsVirtualKeyboardEnabledAtom((prev) => !prev);
  };
}

export { useBackspaceUserInput, useUpdateUserInput, useToggleVirtualKeyboard };
