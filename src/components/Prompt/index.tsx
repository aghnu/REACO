import PromptString from './PromptString';
import BlinkingCursor from './BlinkingCursor';
import CmdSuggestion from './CmdSuggestion';
import UserInput from './UserInput';
import styles from '@styles/components/prompt.module.scss';
import { useEffect } from 'react';

const Prompt = ({
  onUserInputUpdate = () => {},
  onSuggestionChange = () => {},
}: {
  onUserInputUpdate?: () => void;
  onSuggestionChange?: () => void;
}) => {
  useEffect(() => {
    onUserInputUpdate();
  }, [onUserInputUpdate]);

  return (
    <>
      <CmdSuggestion onSuggestionChange={onSuggestionChange} />
      <p className={styles.prompt}>
        <BlinkingCursor />
        <span className={styles.input}>
          <PromptString />
          <UserInput onUserInputUpdate={onUserInputUpdate} />
        </span>
      </p>
    </>
  );
};

export default Prompt;
