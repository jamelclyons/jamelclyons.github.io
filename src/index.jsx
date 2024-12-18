import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import FirebaseConfig from './services/firebase/config.js';

import App from './App.jsx';
import store from './model/store.js';

const root = document.getElementById('root');

if (root) {
  ReactDOM.createRoot(root).render(
    <Provider store={store}>
      <App />
      <FirebaseConfig />
    </Provider>
  );
} else {
  console.log('ID root could not be found on the page.');
}
