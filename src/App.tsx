import ConsolePage from '@pages/ConsolePage';
import styles from '@styles/modules/wrapper.module.scss';
import { startApplication } from '@applications/logics';
import DevDebug from '@components/DevDebug';
import { checkIsDevEnv } from '@utils/helpers';
import { useEffect } from 'react';

const App = () => {
  useEffect(startApplication, []);

  return (
    <>
      {checkIsDevEnv() && <DevDebug />}
      <div className={styles['container-page']}>
        <ConsolePage />
      </div>
    </>
  );
};

export default App;
