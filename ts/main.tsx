import 'babel-polyfill';
import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import getStore from './reducers/store';
import Three from './components/three';

const store = getStore();

render(
  <Provider store={store}>
    <Three />
  </Provider>,
  document.getElementById('app')
);

