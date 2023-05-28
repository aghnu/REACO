import { useUserInput } from '@store/displayState';
import styles from '@styles/components/prompt.module.scss';
import TextRaw from '@components/TextRaw';

const UserInput = () => {
  const userInput = useUserInput();

  return (
    <>
      <span className={styles.userInput}>
        <TextRaw text={userInput} />
      </span>
    </>
  );
};

export default UserInput;
