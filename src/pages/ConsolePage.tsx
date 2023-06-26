import Prompt from '@components/Prompt';
import Display from '@components/Display';
import Footer from '@components/Footer';
import ActionBar from '@components/ActionBar';
import VirtualKeyboard from '@components/VirtualKeyboard';
import FunctionBar from '@components/FunctionBar';
import styles from '../styles/components/console-page.module.scss';
import { systemState } from '@/store';
import { useAtomValue } from 'jotai';
import { useCallback, useState } from 'react';

const ConsolePage = () => {
  const isVirtualKeyboardEnabled = useAtomValue(
    systemState.isVirtualKeyboardEnabledAtom
  );
  const [displayContainerEl, setDisplayContainerEl] =
    useState<HTMLDivElement | null>(null);
  const handlerDisplayUpdate = useCallback(() => {
    if (displayContainerEl === null) return;
    displayContainerEl.scrollTop = displayContainerEl.scrollHeight;
  }, [displayContainerEl]);

  return (
    <div className={styles['container-page']}>
      <div className={styles['container-console']}>
        <ActionBar />
        <div className={styles.top} ref={setDisplayContainerEl}>
          <Display onDisplayPrintUpdate={handlerDisplayUpdate} />
          <Prompt onUserInputUpdate={handlerDisplayUpdate} />
        </div>
        <div className={styles.bottom}>
          {isVirtualKeyboardEnabled && <VirtualKeyboard />}
          <FunctionBar />
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default ConsolePage;
