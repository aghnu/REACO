import {
  Prompt,
  Display,
  Footer,
  VirtualKeyboard,
  FunctionBar,
} from '@/components';
import styles from '../styles/modules/wrapper.module.scss';
import useStartKeyboardInput from '@hooks/useStartKeyboardInput';

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
