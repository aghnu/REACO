import ConsolePage from '@pages/ConsolePage';
import styles from '@styles/modules/wrapper.module.scss';
import initApplicationLogic from '@applications/logics';
import store from '@/store';
import { Provider } from 'jotai';

initApplicationLogic();

const App = () => {
  return (
    <Provider store={store}>
      <div className={styles['container-page']}>
        <ConsolePage />
      </div>
    </Provider>
  );
};

export default App;
