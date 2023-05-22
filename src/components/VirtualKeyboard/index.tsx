import KeyPad, { type KeySize } from '@components/VirtualKeyboard/KeyPad';
import styles from '@styles/components/virtual-keyboard.module.scss';

const KEYS_DISPLAY = [
  ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['z', 'x', 'c', 'v', 'b', 'n', 'm', '/'],
  [' ', 'Back', 'Enter'],
] as const;

function getKeySize(key: string): KeySize {
  if (key === ' ') return 'large';
  if (key === 'Back' || key === 'Enter') return 'mid';
  return 'small';
}

function handleKeyClick(label: string) {
  console.log(label);
}

const VirtualKeyboard = () => {
  return (
    <div className={styles['virtual-keyboard']}>
      {KEYS_DISPLAY.map((row, i) => (
        <div className={styles.row} key={i}>
          {row.map((label, ii) => (
            <KeyPad
              label={label}
              key={ii}
              size={getKeySize(label)}
              onKeyClick={handleKeyClick}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default VirtualKeyboard;
