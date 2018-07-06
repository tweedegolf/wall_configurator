import {Hole, Block, WallSettings} from './interfaces';

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


const createCanvasPreview = (settings:WallSettings) => {
  const canvas:HTMLElement = document.createElement('canvas');

  let ctx:(CanvasRenderingContext2D | null) = null;
  if(canvas instanceof HTMLCanvasElement) {
    ctx = canvas.getContext('2d');
    if(ctx instanceof CanvasRenderingContext2D) {
      ctx.canvas.width = settings.width;
      ctx.canvas.height = settings.height;
      const element = document.getElementById('preview');
      if (element instanceof HTMLElement) {
        element.style.height = `${settings.height}px`;
        element.style.transform = `scale(1, -1)`;
        element.appendChild(canvas);
      }
    }
  }

  return {
    update: (holes:Array<Hole>, blocks:Array<Block>) => {
      if(ctx instanceof CanvasRenderingContext2D) {
        update(ctx, holes, blocks);
      }
    }
  }
};

export default createCanvasPreview;
