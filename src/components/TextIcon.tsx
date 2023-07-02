import styles from '@styles/components/text-icon.module.scss';
import { getClassName } from '@utils/helpers';

const TextIcon = ({
  iconElement,
  className = '',
}: {
  iconElement: JSX.Element;
  className?: string;
}) => {
  return (
    <div className={getClassName([styles['text-icon'], className])}>
      <div className={styles['text-icon__icon']}>{iconElement}</div>
    </div>
  );
};

export default TextIcon;
