import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { enableMapSet } from 'immer';
import '@styles/global.scss';
import { Provider } from 'jotai';
import store from '@/store';

enableMapSet();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
