import KeyPad from './KeyPad';
import styles from '@styles/components/virtual-keyboard.module.scss';
import KeyboardController from '@applications/controllers/KeyboardController';
import { getKeyHandler, KEYS_DISPLAY_LETTER } from '@utils/keyboard';
import { type KeySets } from '@type/KeyboardTypes';
import { useState } from 'react';
import SystemInput from './SystemInput';

const VirtualKeyboard = () => {
  const keyboardController = KeyboardController.getInstance();
  const [keySet, setKeySet] = useState<KeySets>(KEYS_DISPLAY_LETTER);

  return (
    <div className={styles['virtual-keyboard']}>
      <SystemInput />
      {keySet.map((row, i) => (
        <div className={styles.row} key={i}>
          {row.map((key, ii) => (
            <KeyPad
              key={ii}
              keyId={key}
              onKeyClick={getKeyHandler(
                key,
                (keySet) => {
                  setKeySet(keySet);
                },
                () => {
                  keyboardController.inputKey(key);
                }
              )}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default VirtualKeyboard;
