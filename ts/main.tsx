// import 'babel-polyfill';
import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import getStore from './reducers/store';
import Three from './containers/three';
import Preview from './containers/preview';
import Controls from './containers/controls';

const store = getStore();

render(
  <Provider store={store}>
    <div>
      <Preview element={document.getElementById('view2D')}/>
      <Three element={document.getElementById('view3D')}/>
      <Controls />
    </div>
  </Provider>,
  document.getElementById('right')
);

