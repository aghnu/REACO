import KeyPad, { type KeySize } from './KeyPad';
import styles from '@styles/components/virtual-keyboard.module.scss';
import KeyboardController from '@applications/controllers/KeyboardController';

const KEYS_DISPLAY = [
  ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['z', 'x', 'c', 'v', 'b', 'n', 'm', '/'],
  [' ', 'Backspace', 'Enter'],
] as const;

function getKeySize(key: string): KeySize {
  if (key === ' ') return 'large';
  if (key === 'Backspace' || key === 'Enter') return 'mid';
  return 'small';
}

function getKeyLabel(key: string): string {
  if (key === 'Backspace') return 'Back';
  if (key === ' ') return 'Space';
  return key;
}

const VirtualKeyboard = () => {
  const keyboardController = KeyboardController.getInstance();

  return (
    <div className={styles['virtual-keyboard']}>
      {KEYS_DISPLAY.map((row, i) => (
        <div className={styles.row} key={i}>
          {row.map((key, ii) => (
            <KeyPad
              key={ii}
              keyId={key}
              label={getKeyLabel(key)}
              size={getKeySize(key)}
              onKeyClick={() => {
                keyboardController.inputKey(key);
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default VirtualKeyboard;
