import KeyPad from './KeyPad';
import styles from '@styles/components/virtual-keyboard.module.scss';
import { type KeySetsSet, type KeySetsMobile } from '@type/KeyboardTypes';
import { getKeyHandler } from '@utils/keyboard';
import KeyboardController from '@applications/controllers/KeyboardController';
import SystemInput from './SystemInput';

const KeyboardMobile = ({
  keySetsMobile,
  onChangeKeySet,
}: {
  keySetsMobile: KeySetsMobile;
  onChangeKeySet: (keySetsSet: KeySetsSet) => void;
}) => {
  const keyboardController = KeyboardController.getInstance();
  return (
    <div className={styles.mobile}>
      <SystemInput />
      <div className={styles['rows-container']}>
        {keySetsMobile.map((row, i) => (
          <div className={styles.row} key={i}>
            {row.map((key, ii) => (
              <KeyPad
                key={ii}
                keyId={key}
                onKeyClick={getKeyHandler(key, onChangeKeySet, () => {
                  keyboardController.inputKey(key);
                })}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default KeyboardMobile;
