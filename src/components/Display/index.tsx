import PromptString from './PromptString';
import BlinkingCursor from './BlinkingCursor';
import UserInput from './UserInput';
import styles from '@styles/components/display.module.scss';

const Display = () => {
  return (
    <div className={styles.display}>
      <PromptString />
      <UserInput />
      <BlinkingCursor />
    </div>
  );
};

export default Display;
