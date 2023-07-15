import { systemState } from '@/store';
import { useAtomValue } from 'jotai';
import styles from '@styles/components/prompt.module.scss';
import { getClassName } from '@utils/helpers';
import { useEffect, useState } from 'react';
import KeyboardController from '@applications/controllers/KeyboardController';

const BlinkingCursor = () => {
  const keyboardController = KeyboardController.getInstance();
  const [spanElement, setSpanElement] = useState<HTMLElement | null>(null);
  const cursorOffset = useAtomValue(keyboardController.getCursorOffsetAtom());
  const isBlur = useAtomValue(keyboardController.getKeyboardBlurAtom());
  const isBlinking = useAtomValue(systemState.isInputCursorBlinkingAtom);
  const promptInfo = useAtomValue(systemState.promptInfoAtom);
  const appPrompt = useAtomValue(systemState.promptAppTopAtom);
  const currentInput = useAtomValue(systemState.inputCurrentAtom);

  const pseudoStringPrompt =
    appPrompt !== null
      ? `${appPrompt.promptStr} `
      : `${promptInfo.userName}@${promptInfo.systemDomain}:~${promptInfo.systemPath}$: `;

  const pseudoString = (
    pseudoStringPrompt +
    currentInput.slice(0, currentInput.length - cursorOffset)
  ).replaceAll(' ', '\u00a0');

  useEffect(() => {
    if (spanElement === null) return;
    spanElement.dataset.text = pseudoString;
  }, [pseudoString, spanElement]);

  return (
    <>
      <span
        ref={setSpanElement}
        className={getClassName([
          styles.cursor,
          { [styles.blink]: isBlinking && !isBlur },
          { [styles.hidden]: isBlur },
        ])}
      />
    </>
  );
};

export default BlinkingCursor;
