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
  const isInputHighLight = useAtomValue(systemState.isInputHighLightAtom);

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
          <TextRaw
            text={appPrompt.input}
            className={
              isInputHighLight
                ? 'gl-color-text-plain--reverse'
                : 'gl-color-text-plain'
            }
          />
        ) : (
          <>
            <TextRaw
              className={
                isUserCmdExist
                  ? isInputHighLight
                    ? 'gl-color-text-plain--reverse'
                    : 'gl-color-text-calm'
                  : isInputHighLight
                  ? 'gl-color-text-plain--reverse'
                  : 'gl-color-text-warn'
              }
              text={userInputCmd}
            />
            <TextRaw
              text={userInputCmdRest}
              className={
                isInputHighLight
                  ? 'gl-color-text-plain--reverse'
                  : 'gl-color-text-plain'
              }
            />
          </>
        )}
      </span>
    </>
  );
};

export default UserInput;
