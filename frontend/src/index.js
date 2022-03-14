import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import {configureStore} from '@reduxjs/toolkit'
import { Provider } from 'react-redux';
import navBarReducer from './features/navbar'
import shoppingCartReducer from './features/shoppingCart';

const store = configureStore({
  reducer:{
    navbar:navBarReducer,
    shoppingCart:shoppingCartReducer,
  }
})
ReactDOM.render(
  <Provider store={store}>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </Provider>
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
