import { type PrimitiveAtom, useAtomValue } from 'jotai';
import styles from '@styles/components/display.module.scss';

const DisplayBlock = ({
  elementAtom,
}: {
  elementAtom: PrimitiveAtom<JSX.Element>;
}) => {
  const element = useAtomValue(elementAtom);

  return <div className={styles.block}>{element}</div>;
};

export default DisplayBlock;
