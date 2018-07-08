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
      }
    }
  }

  render2D(props: PropsType) {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    if (props.width !== this.ctx.canvas.width || props.height !== this.ctx.canvas.height) {
      this.element.style.height = `${props.height}px`;
      this.ctx.canvas.width = props.width;
      this.ctx.canvas.height = props.height;
    }
    props.holes.forEach((hole) => {
      this.ctx.beginPath();
      this.ctx.strokeStyle = '#ff0000';
      this.ctx.lineWidth = 6;
      this.ctx.rect(hole.x, hole.y, hole.width, hole.height);
      this.ctx.stroke();
    });

    props.blocks.forEach((block) => {
      this.ctx.beginPath();
      this.ctx.lineWidth = 0.3;
      this.ctx.strokeStyle = '#000000';
      this.ctx.rect(block.x, block.y, block.width, block.height);
      this.ctx.stroke();
    });
  }

  render() {
    this.render2D(this.props);
    return false;
  }
}

export default connect(mapStateToProps)(Preview);
