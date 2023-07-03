import KeyPad from './KeyPad';
import styles from '@styles/components/virtual-keyboard.module.scss';
import { type KeySetsSet, type KeySetsDesktop } from '@type/KeyboardTypes';
import { getKeyHandler } from '@utils/keyboard';
import KeyboardController from '@applications/controllers/KeyboardController';
import SystemInput from './SystemInput';
import { getClassName } from '@utils/helpers';

const KeyboardDesktop = ({
  keySetsDesktop,
  onChangeKeySet,
}: {
  keySetsDesktop: KeySetsDesktop;
  onChangeKeySet: (keySetsSet: KeySetsSet) => void;
}) => {
  const keyboardController = KeyboardController.getInstance();

  return (
    <div className={styles.desktop}>
      <SystemInput />
      <div className={styles['rows-container']}>
        {keySetsDesktop.map((row, i) => (
          <div
            className={getClassName([
              styles.row,
              i % 2 === 0 ? styles['row--left'] : styles['row--right'],
            ])}
            key={i}
          >
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

export default KeyboardDesktop;
