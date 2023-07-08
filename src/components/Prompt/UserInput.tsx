import { systemState } from '@/store';
import { useAtomValue } from 'jotai';
import styles from '@styles/components/prompt.module.scss';
import TextRaw from '@components/TextRaw';
import { useEffect, useMemo } from 'react';
import { hasApplication } from '@utils/helpers';
import useUserInputCmdSplit from '@hooks/useUserInputCmdSplit';

const UserInput = ({
  onUserInputUpdate = () => {},
}: {
  onUserInputUpdate?: () => void;
}) => {
  const appPrompt = useAtomValue(systemState.promptAppTopAtom);

  const [userInputCmd, userInputCmdRest, userCmd] = useUserInputCmdSplit();
  const isUserCmdExist = useMemo(() => hasApplication(userCmd), [userCmd]);

  useEffect(() => {
    onUserInputUpdate();
  }, [userInputCmd, userInputCmdRest, onUserInputUpdate]);

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
