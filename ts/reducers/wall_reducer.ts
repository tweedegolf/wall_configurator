// import R from 'ramda';
import { WallState, ColladaData } from '../interfaces';
import * as Actions from '../actions';
import {ReduxAction} from '../interfaces';

const wallInitialState:WallState = {
  width: 500,
  height: 350,
  thickness: 30,
  colladas: [],
  allColladas: [],
};

const getIndexById = (items: Array<ColladaData>, id:string):number => {
  for(let i = 0; i < items.length; i++) {
    const item = items[i];
    if(item.id === id) {
      return i;
    }
  }
  return -1;
};

const wall = (state:WallState = wallInitialState, action:ReduxAction):WallState => {
  if (action.type === Actions.UPDATE_WALL_WIDTH) {
    return {
      ...state,
      width: action.payload.width,
    }
  } else if (action.type === Actions.UPDATE_WALL_HEIGHT) {
    return {
      ...state,
      height: action.payload.height,
    }
  } else if (action.type === Actions.UPDATE_WALL_THICKNESS) {
    return {
      ...state,
      thickness: action.payload.thickness,
    }
  } else if (action.type === Actions.COLLADAS_LOADED) {
    return {
      ...state,
      allColladas: [...action.payload.colladas],
    }
  } else if (action.type === Actions.ADD_COLLADA) {
    const index = getIndexById(state.allColladas, action.payload.id);
    if (index !== -1) {
      const collada = state.allColladas[index];
      collada.z = (state.thickness / 2);
      collada.x = 50;
      return {
        ...state,
        colladas: [...state.colladas, collada],
      }
    }
  } else if (action.type === Actions.REMOVE_COLLADA) {
    const colladas = [...state.colladas];
    return {
      ...state,
      colladas: colladas.filter(collada => collada.id !== action.payload.id),
    }
  } else if (action.type === Actions.UPDATE_COLLADA_X) {
    const colladas = [...state.colladas];
    const index = getIndexById(colladas, action.payload.id);
    if (index !== -1) {
      colladas[index].x = parseInt(action.payload.x, 10);
      return {
        ...state,
        colladas,
      }
    }
  } else if (action.type === Actions.UPDATE_COLLADA_Y) {
    const colladas = [...state.colladas];
    const index = getIndexById(colladas, action.payload.id);
    if (index !== -1) {
      colladas[index].y = parseInt(action.payload.y, 10);
      return {
        ...state,
        colladas,
      }
    }
  } else if (action.type === Actions.UPDATE_COLLADA_Z) {
    const colladas = [...state.colladas];
    const index = getIndexById(colladas, action.payload.id);
    if (index !== -1) {
      colladas[index].z = parseInt(action.payload.z, 10);
      return {
        ...state,
        colladas,
      }
    }
  } else if (action.type === Actions.UPDATE_COLLADA_SCALE) {
    const colladas = [...state.colladas];
    const index = getIndexById(colladas, action.payload.id);
    if (index !== -1) {
      colladas[index].scale = parseInt(action.payload.scale, 10);
      return {
        ...state,
        colladas,
      }
    }
  }
  return state;
};

export {
  wall,
  wallInitialState,
};