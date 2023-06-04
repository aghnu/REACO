import { systemState } from '@/store';
import { useAtomValue } from 'jotai';
import styles from '@styles/modules/text.module.scss';

const PromptString = () => {
  const promptInfo = useAtomValue(systemState.promptInfoAtom);

  return (
    <>
      <span className={styles.desc}>
        {promptInfo.userName}@{promptInfo.systemDomain}:
      </span>
      <span className={styles.focus}>~{promptInfo.systemPath}</span>
      <span>$:&nbsp;</span>
    </>
  );
};

export default PromptString;
