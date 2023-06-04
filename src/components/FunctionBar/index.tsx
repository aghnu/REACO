import FunctionKey from './FunctionKey';
import styles from '@styles/components/function-bar.module.scss';
import useFunctionKeys from '@hooks/useFunctionKeys';
import { useCallback } from 'react';
import { systemState } from '@/store';

const FunctionBar = () => {
  const keys = useFunctionKeys();
  const toggleVirtualKeyboard = systemState.useToggleVirtualKeyboard();
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
