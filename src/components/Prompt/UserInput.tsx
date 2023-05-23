import { useUserInput } from '@store/displayState';
import styles from '@styles/components/prompt.module.scss';

const UserInput = () => {
  const userInput = useUserInput();
  return (
    <>
      <span className={styles.userInput}>{userInput}</span>
    </>
  );
};

export default UserInput;
