import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';

import { configureStore } from '@reduxjs/toolkit';
import AuthSlice from './slice/Auth/AuthSlice';
import RegsisterSlice from './slice/Register/RegsisterSlice';

const store = configureStore({
  reducer:{
    user:AuthSlice,
    details:RegsisterSlice
  }
})

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <Provider store={store}>
      <App />
    </Provider>
);

