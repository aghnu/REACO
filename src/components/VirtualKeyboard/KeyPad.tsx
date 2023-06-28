import usePointerClick from '@hooks/usePointerClick';
import styles from '@styles/components/virtual-keyboard.module.scss';
import { useAtomValue } from 'jotai';
import { useEffect, useState } from 'react';
import { getClassName } from '@utils/helpers';
import type { KeySize, KeyVariant } from '@type/KeyboardTypes';

function getKeySizeClass(size: KeySize) {
  if (size === 'mid') return styles['key--mid'];
  if (size === 'large') return styles['key--large'];
  return styles['key--small'];
}

function getKeyVariantClass(variant: KeyVariant) {
  if (variant === 'func') return styles['label--func'];
  return styles['label--norm'];
}

function isKeyEventMatchId(e: KeyboardEvent, keyId: string) {
  return e.key === keyId || e.key.toLowerCase() === keyId;
}

const KeyPad = ({
  label,
  keyId,
  size = 'small',
  variant = 'norm',
  isAllowHold = true,
  onKeyClick = () => {},
}: {
  label: string;
  keyId: string;
  size?: KeySize;
  variant?: KeyVariant;
  isAllowHold?: boolean;
  onKeyClick?: () => void;
}) => {
  const [keyEl, setKeyEl] = useState<HTMLDivElement | null>(null);
  const { pointerDownAtom } = usePointerClick(keyEl, onKeyClick, isAllowHold);
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
      className={getClassName([
        styles.key,
        getKeySizeClass(size),
        { [styles['key--down']]: pointerDown || isPhysicalKeydown },
      ])}
      ref={setKeyEl}
    >
      <div className={styles.pad}>
        <div
          className={getClassName([styles.label, getKeyVariantClass(variant)])}
        >
          <p>{label}</p>
        </div>
      </div>
    </div>
  );
};

export default KeyPad;
