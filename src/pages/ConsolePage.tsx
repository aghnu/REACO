import Prompt from '@components/Prompt';
import Display from '@components/Display';
import styles from '@styles/modules/wrapper.module.scss';
import useStartKeyboardInput from '@hooks/useStartKeyboardInput';

const ConsolePage = () => {
  useStartKeyboardInput();

  return (
    <div className={styles['container-console']}>
      <Display />
      <Prompt />
    </div>
  );
};

export default ConsolePage;
