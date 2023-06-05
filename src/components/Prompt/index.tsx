import PromptString from './PromptString';
import BlinkingCursor from './BlinkingCursor';
import UserInput from './UserInput';
import styles from '@styles/components/prompt.module.scss';
import { useEffect } from 'react';

const Prompt = ({
  onUserInputUpdate = () => {},
}: {
  onUserInputUpdate?: () => void;
}) => {
  useEffect(() => {
    onUserInputUpdate();
  }, [onUserInputUpdate]);

  return (
    <p className={styles.prompt}>
      <PromptString />
      <UserInput onUserInputUpdate={onUserInputUpdate} />
      <BlinkingCursor />
    </p>
  );
};

export default Prompt;
