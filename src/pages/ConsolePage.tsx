import {
  Prompt,
  Display,
  Footer,
  VirtualKeyboard,
  FunctionBar,
} from '@/components';
import styles from '../styles/modules/wrapper.module.scss';
import useStartKeyboardInput from '@hooks/useStartKeyboardInput';
import { useIsVirtualKeyboardEnabled } from '@store/systemState';

const ConsolePage = () => {
  useStartKeyboardInput();
  const isVirtualKeyboardEnabled = useIsVirtualKeyboardEnabled();

  return (
    <div className={styles['container-console']}>
      <div>
        <Display />
        <Prompt />
      </div>
      <div className={styles.bottom}>
        {isVirtualKeyboardEnabled && <VirtualKeyboard />}
        <FunctionBar />
        <Footer />
      </div>
    </div>
  );
};

export default ConsolePage;
