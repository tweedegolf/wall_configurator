import {compose, applyMiddleware, createStore, combineReducers} from 'redux';
import {createLogger} from 'redux-logger';
import thunkMiddleware from 'redux-thunk'
// import { autoRehydrate } from 'redux-persist';
// import thunkMiddleware from 'redux-thunk'
import {wall, wallInitialState} from './wall_reducer';

const combinedReducers = combineReducers({ wall });
const initialState = {
  wall: wallInitialState,
};

const getStore = () => {
  return createStore(
    combinedReducers,
    initialState,
    compose(
      applyMiddleware(
        thunkMiddleware,
        createLogger({collapsed: true}),
      ),
    ),
  )
};

export default getStore;