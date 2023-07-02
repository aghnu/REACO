import { systemState } from '@/store';
import { useAtomValue } from 'jotai';

const PromptString = () => {
  const promptInfo = useAtomValue(systemState.promptInfoAtom);
  const appPrompt = useAtomValue(systemState.promptAppTopAtom);

  return (
    <>
      {appPrompt !== null ? (
        <>
          <span className="gl-color-text-desc">
            {appPrompt.promptStr}&nbsp;
          </span>
        </>
      ) : (
        <>
          <span className="gl-color-text-desc">
            {promptInfo.userName}@{promptInfo.systemDomain}:
          </span>
          <span className="gl-color-text-focus">~{promptInfo.systemPath}</span>
          <span>$:&nbsp;</span>
        </>
      )}
    </>
  );
};

export default PromptString;
