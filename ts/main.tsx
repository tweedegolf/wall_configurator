// import 'babel-polyfill';
import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import getStore from './reducers/store';
import Three from './containers/three';
import Controls from './containers/controls';
import {loadColladas} from './actions';

const store = getStore();
store.dispatch(loadColladas());

render(
  <Provider store={store}>
    <div>
      <Three element={document.getElementById('view3D')}/>
      <Controls />
    </div>
  </Provider>,
  document.getElementById('right')
);

