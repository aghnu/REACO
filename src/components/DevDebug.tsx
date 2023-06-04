import store, { applicationState } from '@/store';
import { useAtomsDebugValue } from 'jotai-devtools';
import { useAtomValue } from 'jotai';

const DevDebug = () => {
  // use states that is outside of DOM tree
  useAtomValue(applicationState.applicationStateAtom);
  useAtomValue(applicationState.applicationInstancesAtom);
  useAtomValue(applicationState.applicationTopInstanceAtom);

  // enable debug
  useAtomsDebugValue({ store });
  return <></>;
};

export default DevDebug;
