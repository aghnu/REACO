import { Prompt, Display, Footer, VirtualKeyboard } from '@/components';
import styles from '../styles/modules/wrapper.module.scss';
import useStartKeyboardInput from '@hooks/useStartKeyboardInput';
import FunctionBar from '@components/FunctionBar';

const ConsolePage = () => {
  useStartKeyboardInput();

  return (
    <div className={styles['container-console']}>
      <div>
        <Display />
        <Prompt />
      </div>
      <div className={styles.bottom}>
        <VirtualKeyboard />
        <FunctionBar />
        <Footer />
      </div>
    </div>
  );
};

export default ConsolePage;
