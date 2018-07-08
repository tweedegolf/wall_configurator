// import 'babel-polyfill';
import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import getStore from './reducers/store';
import Three from './components/three';
import Controls from './components/controls';

const store = getStore();

render(
  <Provider store={store}>
    <div>
      <Three />
      <Controls />
    </div>
  </Provider>,
  document.getElementById('app')
);

