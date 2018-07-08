export const UPDATE_WALL_WIDTH = 'update wall width';
export const UPDATE_WALL_HEIGHT = 'update wall height';
export const UPDATE_WALL_THICKNESS = 'update wall thickness';
export const ADD_HOLE = 'add hole';
export const REMOVE_HOLE = 'remove hole';
export const UPDATE_HOLE_X = 'update hole x';
export const UPDATE_HOLE_Y = 'update hole y';
export const UPDATE_HOLE_WIDTH = 'update hole width';
export const UPDATE_HOLE_HEIGHT = 'update hole height';

export const updateWallWidth = (width:number) => {
  return {
    type: UPDATE_WALL_WIDTH,
    payload: {
      width,
    }
  }
};

export const updateWallHeight = (height:number) => {
  return {
    type: UPDATE_WALL_HEIGHT,
    payload: {
      height,
    }
  }
};

export const updateWallThickness = (thickness:number) => {
  return {
    type: UPDATE_WALL_THICKNESS,
    payload: {
      thickness,
    },
  }
};

export const addHole = () => {
  return {
    type: ADD_HOLE,
  }
};

export const removeHole = (id:string) => {
  return {
    type: REMOVE_HOLE,
    payload: {
      id,
    }
  }
};

export const updateHoleX = (id: string, x:number) => {
  return {
    type: UPDATE_HOLE_X,
    payload: {
      id,
      x,
    },
  }
};

export const updateHoleY = (id: string, y:number) => {
  return {
    type: UPDATE_HOLE_Y,
    payload: {
      id,
      y,
    },
  }
};

export const updateHoleWidth = (id: string, width:number) => {
  return {
    type: UPDATE_HOLE_WIDTH,
    payload: {
      id,
      width,
    },
  }
};

export const updateHoleHeight = (id: string, height:number) => {
  return {
    type: UPDATE_HOLE_HEIGHT,
    payload: {
      id,
      height,
    },
  }
};
