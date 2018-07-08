import React from 'react';
import * as THREE from 'three';
import { connect } from 'react-redux';
import OrbitControls from '../../lib/OrbitControls';
import {AppState, Block, Hole} from '../interfaces';
import createMesh from '../wall/create_mesh';
import calculateHoles from '../reducers/calculate_holes';

interface PropsType {
  blocks: Array<Block>,
  holes:Array<Hole>,
  width: number,
};

interface Three {
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera,
  renderer: THREE.WebGLRenderer,
  wallMesh: THREE.Mesh,
  initialized: boolean,
}

const mapStateToProps = (state: AppState):PropsType => {
  const {
    blocks,
    holes,
    width,
  } = calculateHoles(state);
  return {
    blocks,
    holes,
    width
  }
}

class Three extends React.Component {
  static defaultProps = {
  }

  constructor(props) {
    super(props);
    this.initialized = false;
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

    this.wallMesh = createWall();
    // this.scene.add(this.wall);
  }

  render3D() {
    this.renderer.render(this.scene, this.camera);
  }

  render() {
    console.log(this.initialized);
    if(this.initialized === false) {
      this.initialized = true;
      this.render3D();
      return <div id="three">aap</div>;
    }
    this.render3D();
    return false;
  }
}

export default connect(mapStateToProps)(Three);
