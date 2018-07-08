import {Hole, Block, WallState} from './interfaces';

const update = (ctx:CanvasRenderingContext2D, holes:Array<Hole>, blocks:Array<Block>) => {

};


const createCanvasPreview = (settings:WallState) => {


  return {
    update: (holes:Array<Hole>, blocks:Array<Block>) => {
      if(ctx instanceof CanvasRenderingContext2D) {
        update(ctx, holes, blocks);
      }
    }
  }
};

export default createCanvasPreview;
