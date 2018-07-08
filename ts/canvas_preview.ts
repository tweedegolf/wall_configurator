import {Hole, Block, WallState} from './interfaces';

const update = (ctx:CanvasRenderingContext2D, holes:Array<Hole>, blocks:Array<Block>) => {
  holes.forEach((hole) => {
    ctx.beginPath();
    ctx.strokeStyle = '#ff0000';
    ctx.lineWidth = 6;
    ctx.rect(hole.x, hole.y, hole.width, hole.height);
    ctx.stroke();
  });


  blocks.forEach((block) => {
    ctx.beginPath();
    ctx.lineWidth = 0.3;
    ctx.strokeStyle = '#000000';
    ctx.rect(block.x, block.y, block.width, block.height);
    ctx.stroke();
  });
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
