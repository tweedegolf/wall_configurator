import React from 'react';
import { connect } from 'react-redux';
import {AppState, Block, Hole} from '../interfaces';
import calculateHoles from '../reducers/calculate_holes';

interface PropsType {
  blocks: Array<Block>,
  holes:Array<Hole>,
  width: number,
  thickness: number,
};

interface Preview {
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera,
  renderer: THREE.WebGLRenderer,
  wall: THREE.Mesh,
}

const mapStateToProps = (state: AppState):PropsType => {
  const {
    blocks,
    holes,
    width,
    thickness,
  } = calculateHoles(state);
  return {
    blocks,
    holes,
    width,
    thickness,
  }
}

class Three extends React.Component {
  static defaultProps = {
  }

  constructor(props) {
    super(props);

    const canvas:HTMLElement = document.createElement('canvas');

    let ctx:(CanvasRenderingContext2D | null) = null;
    if(canvas instanceof HTMLCanvasElement) {
      this.ctx = canvas.getContext('2d');
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


  }

  render3D(props?: PropsType) {
    if (props) {
      updateGeometry(this.wall.geometry, props.thickness, props.blocks, props.holes);
      this.wall.position.x = -props.width / 2;
    }
    this.renderer.render(this.scene, this.camera);
  }

  render() {
    this.render3D(this.props);
    return false;
  }
}

export default connect(mapStateToProps)(Three);
