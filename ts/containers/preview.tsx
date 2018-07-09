import React from 'react';
import { connect } from 'react-redux';
import {AppState, Block, Hole} from '../interfaces';
import calculateHoles from '../reducers/calculate_holes';

interface PropsType {
  blocks: Array<Block>,
  holes:Array<Hole>,
  width: number,
  height: number,
  thickness: number,
};

interface Preview {
  ctx: CanvasRenderingContext2D,
  element: HTMLDivElement,
}

const mapStateToProps = (state: AppState):PropsType => {
  const {
    blocks,
    holes,
    width,
    height,
    thickness,
  } = calculateHoles(state);
  return {
    blocks,
    holes,
    width,
    height,
    thickness,
  }
}

class Preview extends React.Component {
  static defaultProps = {
  }

  constructor(props) {
    super(props);

    const canvas:HTMLElement = document.createElement('canvas');

    if(canvas instanceof HTMLCanvasElement) {
      let ctx:(CanvasRenderingContext2D | null) = canvas.getContext('2d');
      if(ctx instanceof CanvasRenderingContext2D) {
        this.ctx = ctx;
        this.element = props.element;
        this.element.style.transform = `scale(1, -1)`;
        this.element.appendChild(canvas);
        const {
          width,
          height,
        } = this.element.getBoundingClientRect();
        this.ctx.canvas.width = width;
        this.ctx.canvas.height = height;
      }
    }
  }

  render2D(props: PropsType) {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    const {
      holes,
      blocks,
      width,
      height,
    } = props;

    const {
      canvas: {
        width: canvasWidth,
        height: canvasHeight,
      },
    } = this.ctx;

    let s:number = 0;

    if (height >= canvasHeight) {
      const w = canvasHeight * (width / height);
      if (w >= canvasWidth) {
        s = canvasWidth / width;
      } else {
        s = canvasHeight / height;
      }
    } else if (width >= canvasWidth) {
      const h = canvasWidth * (height / width);
      if (h >= canvasHeight) {
        s = canvasHeight / height;
      } else {
        s = canvasWidth / width;
      }
    }
    const transX = (canvasWidth / 2) - ((width * s) / 2);
    const transY = (canvasHeight / 2) - ((height * s) / 2);
    this.ctx.transform(s, 0, 0, s, transX, transY);
    this.ctx.fillStyle = '#ffffff';
    this.ctx.fillRect(0, 0, width, height);

    holes.forEach((hole) => {
      this.ctx.beginPath();
      this.ctx.strokeStyle = '#ff0000';
      this.ctx.lineWidth = 6;
      this.ctx.rect(hole.x, hole.y, hole.width, hole.height);
      this.ctx.stroke();
    });

    blocks.forEach((block) => {
      this.ctx.beginPath();
      this.ctx.lineWidth = 0.3;
      this.ctx.strokeStyle = '#000000';
      this.ctx.rect(block.x, block.y, block.width, block.height);
      this.ctx.stroke();
    });

    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
  }

  render() {
    this.render2D(this.props);
    return false;
  }
}

export default connect(mapStateToProps)(Preview);
