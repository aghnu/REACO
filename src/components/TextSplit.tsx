import styles from '@styles/components/text-split.module.scss';
import { getClassName } from '@utils/helpers';

const TextSplit = ({
  left,
  right,
  type = 'normal',
}: {
  left: JSX.Element;
  right: JSX.Element;
  type?: 'alt' | 'normal';
}) => {
  return (
    <div className={styles['text-split']}>
      {left}
      <span
        className={getClassName([
          styles['text-split__sep'],
          { [styles['text-split__sep--alt']]: type === 'alt' },
        ])}
      />
      {right}
    </div>
  );
};

export default TextSplit;
