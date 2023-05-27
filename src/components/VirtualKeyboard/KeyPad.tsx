import usePointerClick from '@hooks/usePointerClick';
import styles from '@styles/components/virtual-keyboard.module.scss';
import { useAtomValue } from 'jotai';
import { useEffect, useRef, useState } from 'react';

export type KeySize = 'small' | 'mid' | 'large';

function getKeySizeClass(size: KeySize) {
  if (size === 'mid') return styles['key--mid'];
  if (size === 'large') return styles['key--large'];
  return styles['key--small'];
}

function isKeyEventMatchId(e: KeyboardEvent, keyId: string) {
  return e.key === keyId || e.key.toLowerCase() === keyId;
}

const KeyPad = ({
  label,
  keyId,
  size = 'small',
  onKeyClick = () => {},
}: {
  label: string;
  keyId: string;
  size?: KeySize;
  onKeyClick?: () => void;
}) => {
  const keyRef = useRef<HTMLDivElement>(null);
  const { pointerDownAtom } = usePointerClick(keyRef, onKeyClick);
  const pointerDown = useAtomValue(pointerDownAtom);
  const [isPhysicalKeydown, setIsPhysicalKeydown] = useState(false);

  useEffect(() => {
    const handlePhysicalKeydown = (e: KeyboardEvent) => {
      if (isKeyEventMatchId(e, keyId)) setIsPhysicalKeydown(true);
    };

    const handlePhysicalKeyup = (e: KeyboardEvent) => {
      if (isKeyEventMatchId(e, keyId)) setIsPhysicalKeydown(false);
    };

    const handleBlurKeyup = () => {
      setIsPhysicalKeydown(false);
    };

    document.addEventListener('keydown', handlePhysicalKeydown);
    document.addEventListener('keyup', handlePhysicalKeyup);
    document.addEventListener('blur', handleBlurKeyup);
    return () => {
      document.removeEventListener('keydown', handlePhysicalKeydown);
      document.removeEventListener('keyup', handlePhysicalKeyup);
      document.removeEventListener('blur', handleBlurKeyup);
    };
  }, [keyId]);

  return (
    <div
      className={[
        styles.key,
        getKeySizeClass(size),
        (pointerDown || isPhysicalKeydown) && styles['key--down'],
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
