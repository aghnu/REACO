import PromptString from './PromptString';
import BlinkingCursor from './BlinkingCursor';
import UserInput from './UserInput';
import styles from '@styles/components/prompt.module.scss';

const Prompt = () => {
  return (
    <p className={styles.prompt}>
      <PromptString />
      <UserInput />
      <BlinkingCursor />
    </p>
  );
};

export default Prompt;
