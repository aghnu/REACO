import { systemState } from '@/store';
import { useAtomValue } from 'jotai';

const PromptString = () => {
  const promptInfo = useAtomValue(systemState.promptInfoAtom);

  return (
    <>
      <span className="gl-color-text-desc">
        {promptInfo.userName}@{promptInfo.systemDomain}:
      </span>
      <span className="gl-color-text-focus">~{promptInfo.systemPath}</span>
      <span>$:&nbsp;</span>
    </>
  );
};

export default PromptString;
