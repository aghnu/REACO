import ConsolePage from '@pages/ConsolePage';
import { startApplication } from '@applications/controllers';
import DevDebug from '@components/DevDebug';
import { checkIsDevEnv } from '@utils/helpers';
import { useEffect } from 'react';

const App = () => {
  useEffect(startApplication, []);

  return (
    <>
      {checkIsDevEnv() && <DevDebug />}
      <ConsolePage />
    </>
  );
};

export default App;
