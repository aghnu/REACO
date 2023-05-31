import ConsolePage from '@pages/ConsolePage';
import styles from '@styles/modules/wrapper.module.scss';
import initApplicationLogic from '@applications/logics';

initApplicationLogic();

const App = () => {
  return (
    <div className={styles['container-page']}>
      <ConsolePage />
    </div>
  );
};

export default App;
