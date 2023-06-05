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
    <div className={styles['container-console']}>
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
  );
};

export default ConsolePage;
