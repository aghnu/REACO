import type { IconFactoryFunc } from '@type/utilitiesTypes';
import { useMemo } from 'react';
import styles from '@styles/components/function-bar.module.scss';

const FunctionKey = ({
  name,
  colorStyle,
  iconFunc,
  onKeyClick = () => {},
}: {
  name: string;
  colorStyle: string;
  iconFunc: IconFactoryFunc;
  onKeyClick?: () => void;
}) => {
  const iconElement = useMemo(
    () => iconFunc(colorStyle, '100%'),
    [iconFunc, colorStyle]
  );
  return (
    <>
      <div
        className={styles['function-key']}
        style={{ color: colorStyle }}
        onClick={onKeyClick}
      >
        <div className={styles['icon-container']}>
          <div className={styles.icon}>{iconElement}</div>
        </div>

        <p className={styles.name}>{name}</p>
      </div>
    </>
  );
};

export default FunctionKey;
