// import R from 'ramda';
import { WallState, ColladaData, ColladaModel } from '../interfaces';
import * as Actions from '../actions';
import {ReduxAction} from '../interfaces';


const wallInitialState:WallState = {
  width: 825,
  height: 350,
  thickness: 30,
  colladas: [],
  colladaModels: {},
  colladaIndex: 0,
  countPerModel: {},
};

const getIndexById = (items: Array<ColladaData | ColladaModel>, id:string):number => {
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
      colladaModels: {...action.payload.colladas},
    }
  } else if (action.type === Actions.ADD_COLLADA) {
    const m = state.colladaModels[action.payload.id];
    if (m) {
      const {
        width,
        height,
        depth,
        model,
        name,
        id,
      } = m;

      const clone = {...state.countPerModel};
      if(clone[id] !== undefined) {
        clone[id] += 1;
      } else {
        clone[id] = 1;
      }

      const collada = {
        index: state.colladaIndex,
        id: `collada-${state.colladaIndex}`,
        model: model.clone(),
        modelId: id,
        // modelName: `${name} #${clone[id]}`,
        modelName: name,
        width,
        height,
        depth,
        x: 50,
        y: 0,
        z: state.thickness / 2,
        scale: 1,
      };

      return {
        ...state,
        colladaIndex: state.colladaIndex + 1,
        colladas: [...state.colladas, collada],
        countPerModel: clone,
      }
    }
  } else if (action.type === Actions.REMOVE_COLLADA) {
    const id = action.payload.id;
    const colladas = [...state.colladas];
    const clone = {...state.countPerModel};
    if(clone[id] !== undefined) {
      clone[id] -= 1;
    }
    return {
      ...state,
      colladas: colladas.filter(collada => collada.id !== id),
      countPerModel: clone,
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
      const target = colladas[index];
      const model = state.colladaModels[target.modelId];
      const scale = action.payload.scale;
      target.scale = scale;
      target.width = model.width * scale;
      target.height = model.height * scale;
      target.depth = model.depth * scale;
      colladas[index] = target;
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