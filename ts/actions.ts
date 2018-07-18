import fetchColladas from './fetch_colladas';
import { GenericFunction, ColladaModel } from './interfaces';

export const UPDATE_WALL_WIDTH = 'update wall width';
export const updateWallWidth = (width:number) => {
  return {
    type: UPDATE_WALL_WIDTH,
    payload: {
      width,
    }
  }
};

export const UPDATE_WALL_HEIGHT = 'update wall height';
export const updateWallHeight = (height:number) => {
  return {
    type: UPDATE_WALL_HEIGHT,
    payload: {
      height,
    }
  }
};

export const UPDATE_WALL_THICKNESS = 'update wall thickness';
export const updateWallThickness = (thickness:number) => {
  return {
    type: UPDATE_WALL_THICKNESS,
    payload: {
      thickness,
    },
  }
};

export const COLLADAS_LOADED = 'colladas loaded';
export const colladasLoaded = (colladas:{[key:string]: ColladaModel}) => {
  return {
    type: COLLADAS_LOADED,
    payload: {
      colladas,
    },
  }
};

export const COLLADAS_LOADING = 'colladas loading';
export const colladasLoading = () => {
  return {
    type: COLLADAS_LOADING,
  }
};

export const loadColladas:GenericFunction = () => {
  return async (dispatch:GenericFunction) => {
    dispatch(colladasLoading());
    const colladas = await fetchColladas();
    dispatch(colladasLoaded(colladas));
  };
};

export const ADD_COLLADA = 'add collada';
export const addCollada = (id:string) => {
  return {
    type: ADD_COLLADA,
    payload: {
      id,
    }
  };
};

export const REMOVE_COLLADA = 'remove collada';
export const removeCollada = (id:string) => {
  return {
    type: REMOVE_COLLADA,
    payload: {
      id,
    }
  };
};

export const UPDATE_COLLADA_X = 'update collada x';
export const updateColladaX = (id: string, x:number) => {
  return {
    type: UPDATE_COLLADA_X,
    payload: {
      id,
      x,
    },
  }
};

export const UPDATE_COLLADA_Y = 'update collada y';
export const updateColladaY= (id: string, y:number) => {
  return {
    type: UPDATE_COLLADA_Y,
    payload: {
      id,
      y,
    },
  }
};

export const UPDATE_COLLADA_Z = 'update collada z';
export const updateColladaZ= (id: string, z:number) => {
  return {
    type: UPDATE_COLLADA_Z,
    payload: {
      id,
      z,
    },
  }
};

export const UPDATE_COLLADA_SCALE = 'update collada scale';
export const updateColladaScale= (id: string, scale:number) => {
  return {
    type: UPDATE_COLLADA_SCALE,
    payload: {
      id,
      scale,
    },
  }
};
