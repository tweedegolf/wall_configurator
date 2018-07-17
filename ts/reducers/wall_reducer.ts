// import R from 'ramda';
import { WallState, ColladaData } from '../interfaces';
import * as Actions from '../actions';
import {ReduxAction, Hole} from '../interfaces';

const wallInitialState:WallState = {
  width: 500,
  height: 350,
  thickness: 30,
  holes: [],
  colladas: [],
  allColladas: [],
};

const getIndexById = (items: Array<Hole | ColladaData>, id:string):number => {
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
  } else if (action.type === Actions.ADD_HOLE) {
    return {
      ...state,
      holes: [...state.holes, {
        id: `hole-${Date.now()}`,
        index: state.holes.length,
        x: (state.width / 2) - 50,
        y: (state.height / 2) - 50,
        width: 100,
        height: 100,
      }],
    }
  } else if (action.type === Actions.REMOVE_HOLE) {
    const holes = [...state.holes];
    return {
      ...state,
      holes: holes.filter(hole => hole.id !== action.payload.id),
    }
  } else if (action.type === Actions.UPDATE_HOLE_X) {
    const holes = [...state.holes];
    const index = getIndexById(holes, action.payload.id);
    if (index !== -1) {
      holes[index].x = parseInt(action.payload.x, 10);
      return {
        ...state,
        holes,
      }
    }
  } else if (action.type === Actions.UPDATE_HOLE_Y) {
    const holes = [...state.holes];
    const index = getIndexById(holes, action.payload.id);
    if (index !== -1) {
      holes[index].y = parseInt(action.payload.y, 10);;
      return {
        ...state,
        holes,
      }
    }
  } else if (action.type === Actions.UPDATE_HOLE_WIDTH) {
    const holes = [...state.holes];
    const index = getIndexById(holes, action.payload.id);
    if (index !== -1) {
      holes[index].width = parseInt(action.payload.width, 10);;
      return {
        ...state,
        holes,
      }
    }
  } else if (action.type === Actions.UPDATE_HOLE_HEIGHT) {
    const holes = [...state.holes];
    const index = getIndexById(holes, action.payload.id);
    if(index !== -1) {
      holes[index].height = parseInt(action.payload.height, 10);
      return {
        ...state,
        holes,
      }
    }
  } else if (action.type === Actions.COLLADAS_LOADED) {
    console.log(action.payload);
    return {
      ...state,
      allColladas: [...action.payload.colladas],
    }
  } else if (action.type === Actions.ADD_COLLADA) {
    return {
      ...state,
      colladas: [...state.colladas, action.payload.collada],
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
  }
  return state;
};

export {
  wall,
  wallInitialState,
};