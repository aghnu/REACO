import FunctionKey from './FunctionKey';
import styles from '@styles/components/function-bar.module.scss';
import useFunctionKeys from '@hooks/useFunctionKeys';
import { useCallback } from 'react';
import { useToggleVirtualKeyboard } from '@store/systemState';

const FunctionBar = () => {
  const keys = useFunctionKeys();
  const toggleVirtualKeyboard = useToggleVirtualKeyboard();
  const handleKeyClick = useCallback(
    (name: string) => {
      if (name === 'keyboard') toggleVirtualKeyboard();
    },
    [toggleVirtualKeyboard]
  );

  return (
    <>
      <div className={styles['function-bar']}>
        <div className={styles['function-bar-container']}>
          {keys.map((key, index) => (
            <FunctionKey
              key={index}
              name={key.name}
              colorStyle="var(--color-text-plain)"
              iconFunc={key.icon}
              onKeyClick={() => {
                handleKeyClick(key.name);
              }}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default FunctionBar;
