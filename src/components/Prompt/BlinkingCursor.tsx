import { systemState } from '@/store';
import { useAtomValue } from 'jotai';
import styles from '@styles/components/prompt.module.scss';
import { getClassName } from '@utils/helpers';
import { useEffect, useState } from 'react';

const BlinkingCursor = () => {
  const [spanElement, setSpanElement] = useState<HTMLElement | null>(null);
  const isBlinking = useAtomValue(systemState.isInputCursorBlinkingAtom);
  const promptInfo = useAtomValue(systemState.promptInfoAtom);
  const appPrompt = useAtomValue(systemState.promptAppTopAtom);
  const currentInput = useAtomValue(systemState.inputCurrentAtom);

  const pseudoStringPrompt =
    appPrompt !== null
      ? `${appPrompt.promptStr} `
      : `${promptInfo.userName}@${promptInfo.systemDomain}:~${promptInfo.systemPath}$: `;

  const pseudoString = pseudoStringPrompt + currentInput;

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
          { [styles.blink]: isBlinking },
        ])}
      />
    </>
  );
};

export default BlinkingCursor;
