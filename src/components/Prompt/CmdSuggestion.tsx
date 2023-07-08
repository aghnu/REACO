import { systemState } from '@store/index';
import { searchApplicationIndex } from '@utils/searching';
import { useAtomValue } from 'jotai';
import { useEffect, useMemo } from 'react';
import styles from '@styles/components/prompt.module.scss';
import { getClassName, hasApplication } from '@utils/helpers';
import TextButton from '@components/TextButton';
import useListenKeyboardKey from '@hooks/useListenKeyboardKey';
import KeyboardController from '@applications/controllers/KeyboardController';

const CmdSuggestion = ({
  onSuggestionChange = () => {},
}: {
  onSuggestionChange?: () => void;
}) => {
  const userInput = useAtomValue(systemState.userInputAtom);
  const userCmd = useAtomValue(systemState.userCmdAtom);
  const searchResults = searchApplicationIndex(userInput, 3);
  const suggestions = useMemo(() => {
    if (hasApplication(userCmd)) return [];
    return searchResults.map((s) => s.cmd);
  }, [searchResults, userCmd]);

  useListenKeyboardKey('Tab', () => {
    if (suggestions.length === 0) return;
    KeyboardController.getInstance().setInput(suggestions[0]);
  });

  useEffect(() => {
    onSuggestionChange();
  }, [suggestions, onSuggestionChange]);

  return (
    <>
      <div className={styles['suggestion-container']}>
        {suggestions.map((s) => (
          <TextButton
            className={getClassName(['gl-color-text-focus'])}
            key={s}
            onClick={() => {
              KeyboardController.getInstance().setInput(s);
            }}
          >
            <p className="gl-gl-nowrap">{s}</p>
          </TextButton>
        ))}
      </div>
    </>
  );
};

export default CmdSuggestion;
