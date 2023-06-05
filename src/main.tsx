import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { enableMapSet } from 'immer';
import '@styles/main.scss';

enableMapSet();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
