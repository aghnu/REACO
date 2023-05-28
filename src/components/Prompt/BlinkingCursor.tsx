import { useIsInputCursorBlinking } from '@store/displayState';
import styles from '@styles/components/prompt.module.scss';
import { getClassName } from '@utilities/helpers';

const BlinkingCursor = () => {
  const isBlinking = useIsInputCursorBlinking();

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
