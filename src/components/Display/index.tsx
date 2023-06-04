import { displayState } from '@/store';
import { useAtomValue } from 'jotai';

const Display = () => {
  const displayJobs = useAtomValue(displayState.displayJobsAtom);

  return (
    <div>
      {displayJobs.map((job) => (
        <div key={job.id}>{job.element}</div>
      ))}
    </div>
  );
};

export default Display;
