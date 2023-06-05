import { systemState } from '@/store';
import { useAtomValue } from 'jotai';
import styles from '@styles/components/prompt.module.scss';
import TextRaw from '@components/TextRaw';
import { useEffect } from 'react';

const UserInput = ({
  onUserInputUpdate = () => {},
}: {
  onUserInputUpdate?: () => void;
}) => {
  const userInput = useAtomValue(systemState.userInputAtom);

  useEffect(() => {
    onUserInputUpdate();
  }, [userInput, onUserInputUpdate]);

  return (
    <>
      <span className={styles.userInput}>
        <TextRaw text={userInput} />
      </span>
    </>
  );
};

export default UserInput;
