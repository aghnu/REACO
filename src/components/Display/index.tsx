import { displayState } from '@/store';
import { useAtomValue } from 'jotai';
import DisplayBlock from './DisplayBlock';
import styles from '@styles/components/display.module.scss';
import { useEffect } from 'react';

const Display = ({
  onDisplayPrintUpdate = () => {},
}: {
  onDisplayPrintUpdate?: () => void;
}) => {
  const displayJobs = useAtomValue(displayState.displayJobsAtom);
  useEffect(() => {
    onDisplayPrintUpdate();
  }, [displayJobs, onDisplayPrintUpdate]);

  return (
    <div className={styles.display}>
      {displayJobs.map((job) => (
        <DisplayBlock key={job.id} elementAtom={job.elementAtom} />
      ))}
    </div>
  );
};

export default Display;
