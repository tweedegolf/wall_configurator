import {uniq} from 'ramda';
import {createSelector} from 'reselect';
import {AppState, WallState, Hole, Block} from '../interfaces';

const sortOnX = (a:Hole, b:Hole) => {
  if (a.x < b.x) {
    return -1;
  }
  if (a.x > b.x) {
    return 1;
  }
  return 0;
};

const sortOnY = (a:Hole, b:Hole) => {
  if (a.y < b.y) {
    return -1;
  }
  if (a.y > b.y) {
    return 1;
  }
  return 0;
};

const getWallState = (state:AppState): WallState => state.wall;

export default createSelector(
  [getWallState],
  (wallState: WallState) => {
    const {
      width,
      height,
      thickness,
      holes,
    } = wallState;

    holes.sort(sortOnX);
    let rasterX:Array<number> = [];
    holes.forEach((hole) => {
      rasterX.push(hole.x);
      rasterX.push(hole.x + hole.width);
    });
    rasterX.sort((a, b) => a - b);
    rasterX = uniq(rasterX);
    rasterX.push(width);

    holes.sort(sortOnY);
    let rasterY:Array<number> = [];
    holes.forEach((hole) => {
      rasterY.push(hole.y);
      rasterY.push(hole.y + hole.height);
    });
    rasterY.sort((a, b) => a - b);
    rasterY = uniq(rasterY);
    rasterY.push(height);

    // console.log(rasterX);
    // console.log(rasterY);

    const blocks:Array<Block> = [];
    let refX = 0;
    rasterX.forEach((lineX) => {
      let refY = 0;
      rasterY.forEach((lineY) => {
        const block:Block = {
          x: refX,
          x2: lineX,
          width: lineX - refX,
          y: refY,
          y2: lineY,
          height: lineY - refY,
        };
        blocks.push(block);
        refY = lineY;
      });
      refX = lineX;
    });

    return {
      holes,
      blocks,
      width,
      thickness,
    };
  }
);
