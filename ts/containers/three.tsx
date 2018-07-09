import React from 'react';
import * as THREE from 'three';
import { connect } from 'react-redux';
import OrbitControls from '../../lib/OrbitControls';
import {AppState, Block, Hole} from '../interfaces';
import createWall from '../wall/create_wall';
import {updateGeometry} from '../wall/utils';
import calculateHoles from '../reducers/calculate_holes';

interface PropsType {
  blocks: Array<Block>,
  holes:Array<Hole>,
  width: number,
  thickness: number,
  // element?: HTMLElement
};

interface Three {
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera,
  renderer: THREE.WebGLRenderer,
  wall: THREE.Mesh,
  element: HTMLDivElement,
  boundResize: (e:Event) => void
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
    this.element = props.element;
    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(75, 1920/1080, 0.1, 10000);
    this.camera.position.set(0, 1000, 500);
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));

    // const axesHelper = new THREE.AxesHelper(400) ;
    // scene.add(axesHelper);

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(-300, 600, 800);
    this.scene.add(light);
    // const helper = new THREE.DirectionalLightHelper(light, 10, 0xff0000);
    // scene.add(helper);

    const gridHelper = new THREE.GridHelper(1000, 10);
    this.scene.add(gridHelper);

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setClearColor(0xfffff0);
    this.renderer.shadowMap.enabled = true;

    const controls = new OrbitControls(this.camera, this.renderer.domElement);
    controls.addEventListener('change', (e:THREE.Event) => {
      this.render3D();
    });

    this.wall = createWall(() => {
      this.render3D();
    });
    this.scene.add(this.wall);
    this.element.appendChild(this.renderer.domElement);
    this.boundResize = this.resize.bind(this);
    this.resize();
  }

  componentDidMount() {
    window.addEventListener('resize', this.boundResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.boundResize);
  }

  resize() {
    const rect = this.element.getBoundingClientRect();
    this.renderer.setSize(rect.width, rect.height)
    this.camera.aspect = rect.width / rect.height;
    this.camera.updateProjectionMatrix();
    this.render3D();
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
