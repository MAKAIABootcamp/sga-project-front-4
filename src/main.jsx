import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import AppRouter from './routes/AppRouter.jsx';
import './styles/index.scss';
import store from './redux/store/store.jsx';
import 'semantic-ui-css/semantic.min.css'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
   <AppRouter/>
    </React.StrictMode>
  </Provider>
);
