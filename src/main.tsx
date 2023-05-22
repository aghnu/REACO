import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { enableMapSet } from 'immer';
import { Provider } from 'jotai';
import './main.scss';

enableMapSet();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider>
      <App />
    </Provider>
  </React.StrictMode>
);
