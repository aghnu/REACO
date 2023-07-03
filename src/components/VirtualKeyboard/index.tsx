import styles from '@styles/components/virtual-keyboard.module.scss';
import { KEYS_DISPLAY_LETTER } from '@utils/keyboard';
import { type KeySetsSet } from '@type/KeyboardTypes';
import { useCallback, useMemo, useState } from 'react';
import { globalStyleState } from '@store/index';
import { useAtomValue } from 'jotai';
import KeyboardDesktop from './KeyboardDesktop';
import KeyboardMobile from './KeyboardMobile';

const VirtualKeyboard = () => {
  const [keySetsSet, setKeySetsSet] = useState<KeySetsSet>(KEYS_DISPLAY_LETTER);
  const breakpoint = useAtomValue(globalStyleState.breakpointAtom);
  const isMobileWidth = useMemo(
    () =>
      breakpoint === '--bp-narrower' ||
      breakpoint === '--bp-narrow' ||
      breakpoint === '--bp-wide',
    [breakpoint]
  );

  const handleChangeKeySet = useCallback((k: KeySetsSet) => {
    setKeySetsSet(k);
  }, []);

  return (
    <div className={styles['virtual-keyboard']}>
      {isMobileWidth ? (
        <KeyboardMobile
          keySetsMobile={keySetsSet.mobile}
          onChangeKeySet={handleChangeKeySet}
        />
      ) : (
        <KeyboardDesktop
          keySetsDesktop={keySetsSet.desktop}
          onChangeKeySet={handleChangeKeySet}
        />
      )}
    </div>
  );
};

export default VirtualKeyboard;
