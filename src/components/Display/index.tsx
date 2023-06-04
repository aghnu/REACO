import { displayState } from '@/store';
import { useAtomValue } from 'jotai';
import DisplayBlock from './DisplayBlock';
import styles from '@styles/components/display.module.scss';

const Display = () => {
  const displayJobs = useAtomValue(displayState.displayJobsAtom);

  return (
    <div className={styles.display}>
      {displayJobs.map((job) => (
        <DisplayBlock key={job.id} elementAtom={job.elementAtom} />
      ))}
    </div>
  );
};

export default Display;
