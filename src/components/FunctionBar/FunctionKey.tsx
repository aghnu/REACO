import type { IconFactoryFunc } from '@type/UtilsTypes';
import { useMemo } from 'react';
import styles from '@styles/components/function-bar.module.scss';
import TextIcon from '@components/TextIcon';
import { getClassName } from '@utils/helpers';

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
    [iconFunc, colorStyle],
  );
  return (
    <>
      <div
        className={getClassName([
          'gl-d-flex gl-gap-25',
          styles['function-key'],
        ])}
        style={{ color: colorStyle }}
        onClick={onKeyClick}
      >
        <TextIcon iconElement={iconElement} />
        <p className={styles.name}>{name}</p>
      </div>
    </>
  );
};

export default FunctionKey;
