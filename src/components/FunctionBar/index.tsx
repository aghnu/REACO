import FunctionKey from '@components/FunctionBar/FunctionKey';
import styles from '@styles/components/function-bar.module.scss';
import useFunctionKeys from '@hooks/useFunctionKeys';

const FunctionBar = () => {
  const keys = useFunctionKeys();

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
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default FunctionBar;
