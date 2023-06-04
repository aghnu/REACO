import { systemState } from '@/store';
import { useAtomValue } from 'jotai';
import styles from '@styles/components/prompt.module.scss';
import { TextRaw } from '@/components';

const UserInput = () => {
  const userInput = useAtomValue(systemState.userInputAtom);

  return (
    <>
      <span className={styles.userInput}>
        <TextRaw text={userInput} />
      </span>
    </>
  );
};

export default UserInput;
