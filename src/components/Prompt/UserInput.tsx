import { systemState } from '@/store';
import { useAtomValue } from 'jotai';
import styles from '@styles/components/prompt.module.scss';
import TextRaw from '@components/TextRaw';
import { useEffect, useMemo } from 'react';
import { hasApplication } from '@utils/helpers';

const UserInput = ({
  onUserInputUpdate = () => {},
}: {
  onUserInputUpdate?: () => void;
}) => {
  const userInput = useAtomValue(systemState.userInputAtom);
  const userCmd = useAtomValue(systemState.userCmdAtom);
  const appPrompt = useAtomValue(systemState.promptAppTopAtom);

  const isUserCmdExist = useMemo(() => hasApplication(userCmd), [userCmd]);
  const [userInputCmd, userInputCmdRest] = useMemo(() => {
    if (userCmd === '') return ['', userInput];
    const searchIndex = userInput.indexOf(userCmd);
    if (searchIndex === -1) return ['', userInput];

    const cutIndex = searchIndex + userCmd.length;
    return [userInput.slice(0, cutIndex), userInput.slice(cutIndex)];
  }, [userInput, userCmd]);

  useEffect(() => {
    onUserInputUpdate();
  }, [userInput, onUserInputUpdate]);

  useEffect(() => {
    if (appPrompt === null) return;
    onUserInputUpdate();
  }, [appPrompt, onUserInputUpdate]);

  return (
    <>
      <span className={styles.userInput}>
        {appPrompt !== null ? (
          <TextRaw text={appPrompt.input} />
        ) : (
          <>
            <TextRaw
              className={
                isUserCmdExist ? 'gl-color-text-calm' : 'gl-color-text-warn'
              }
              text={userInputCmd}
            />
            <TextRaw text={userInputCmdRest} />
          </>
        )}
      </span>
    </>
  );
};

export default UserInput;
