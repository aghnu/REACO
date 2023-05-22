import styles from '@styles/components/virtual-keyboard.module.scss';

export type KeySize = 'small' | 'mid' | 'large';

function getKeySizeClass(size: KeySize) {
  if (size === 'mid') return styles['key--mid'];
  if (size === 'large') return styles['key--large'];
  return styles['key--small'];
}

const KeyPad = ({
  label,
  onKeyClick = () => {},
  size = 'small',
}: {
  label: string;
  onKeyClick?: (label: string) => void;
  size?: KeySize;
}) => {
  return (
    <div
      className={[styles.key, getKeySizeClass(size)].join(' ')}
      onClick={() => {
        onKeyClick(label);
      }}
    >
      <div className={styles.label}>
        <p>{label}</p>
      </div>
    </div>
  );
};

export default KeyPad;
