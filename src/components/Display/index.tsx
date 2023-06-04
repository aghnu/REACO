import { displayState } from '@/store';
import { useAtomValue } from 'jotai';
import styles from '@styles/components/display.module.scss';

const Display = () => {
  const displayJobs = useAtomValue(displayState.displayJobsAtom);

  return (
    <div className={styles.display}>
      {displayJobs.map((job) => (
        <div key={job.id}>{job.element}</div>
      ))}
    </div>
  );
};

export default Display;
