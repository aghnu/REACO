import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import store from './store';
import { Provider } from 'react-redux';
import GlobalStyle from './styles/global';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <GlobalStyle />
      <App />
    </Provider>
  </React.StrictMode>
);
