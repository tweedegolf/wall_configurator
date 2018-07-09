// import R from 'ramda';
import { WallState } from '../interfaces';
import * as Actions from '../actions';
import {ReduxAction, Hole} from '../interfaces';

const wallInitialState:WallState = {
  width: 500,
  height: 350,
  thickness: 30,
  holes: [
    // {
    //   id: 'hole-0',
    //   index: 0,
    //   x: 300,
    //   y: 50,
    //   width: 130,
    //   height: 100,
    // },
    // {
    //   id: 'hole-1',
    //   index: 1,
    //   x: 120,
    //   y: 150,
    //   width: 260,
    //   height: 150,
    // },
    // {
    //   id: 'hole-2',
    //   index: 2,
    //   x: 20,
    //   y: 100,
    //   width: 150,
    //   height: 150,
    // }
  ],
};

const getHoleIndexById = (holes: Array<Hole>, id:string):number => {
  for(let i = 0; i < holes.length; i++) {
    const h = holes[i];
    if(h.id === id) {
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
    const index = getHoleIndexById(holes, action.payload.id);
    if (index !== -1) {
      holes[index].x = parseInt(action.payload.x, 10);
      return {
        ...state,
        holes,
      }
    }
  } else if (action.type === Actions.UPDATE_HOLE_Y) {
    const holes = [...state.holes];
    const index = getHoleIndexById(holes, action.payload.id);
    if (index !== -1) {
      holes[index].y = parseInt(action.payload.y, 10);;
      return {
        ...state,
        holes,
      }
    }
  } else if (action.type === Actions.UPDATE_HOLE_WIDTH) {
    const holes = [...state.holes];
    const index = getHoleIndexById(holes, action.payload.id);
    if (index !== -1) {
      holes[index].width = parseInt(action.payload.width, 10);;
      return {
        ...state,
        holes,
      }
    }
  } else if (action.type === Actions.UPDATE_HOLE_HEIGHT) {
    const holes = [...state.holes];
    const index = getHoleIndexById(holes, action.payload.id);
    if(index !== -1) {
      holes[index].height = parseInt(action.payload.height, 10);
      return {
        ...state,
        holes,
      }
    }
  }
  return state;
};

export {
  wall,
  wallInitialState,
};