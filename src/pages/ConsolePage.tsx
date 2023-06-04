import {
  Prompt,
  Display,
  Footer,
  VirtualKeyboard,
  FunctionBar,
} from '@/components';
import styles from '../styles/modules/wrapper.module.scss';
import { systemState } from '@/store';
import { useAtomValue } from 'jotai';

const ConsolePage = () => {
  const isVirtualKeyboardEnabled = useAtomValue(
    systemState.isVirtualKeyboardEnabledAtom
  );

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
