import usePointerClick from '@hooks/usePointerClick';
import styles from '@styles/components/virtual-keyboard.module.scss';
import { useAtomValue } from 'jotai';
import { useRef } from 'react';

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
  onKeyClick?: () => void;
  size?: KeySize;
}) => {
  const keyRef = useRef<HTMLDivElement>(null);
  const { pointerDownAtom } = usePointerClick(keyRef, onKeyClick);
  const pointerDown = useAtomValue(pointerDownAtom);

  return (
    <div
      className={[
        styles.key,
        getKeySizeClass(size),
        pointerDown && styles['key--down'],
      ].join(' ')}
      ref={keyRef}
    >
      <div className={styles.pad}>
        <div className={styles.label}>
          <p>{label}</p>
        </div>
      </div>
    </div>
  );
};

export default KeyPad;
