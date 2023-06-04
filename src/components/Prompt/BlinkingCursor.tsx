import { systemState } from '@/store';
import { useAtomValue } from 'jotai';
import styles from '@styles/components/prompt.module.scss';
import { getClassName } from '@utils/helpers';

const BlinkingCursor = () => {
  const isBlinking = useAtomValue(systemState.isInputCursorBlinkingAtom);

  return (
    <>
      <span
        className={getClassName([
          styles.cursor,
          { [styles.blink]: isBlinking },
        ])}
      ></span>
    </>
  );
};

export default BlinkingCursor;
