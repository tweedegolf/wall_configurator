import React from 'react';
import * as THREE from 'three';
import OrbitControls from '../../lib/OrbitControls';
import {createWall, defaultSettings} from '../wall';
import {WallState} from '../interfaces';

interface PropsType {
  url: null | string,
  windowWidth: number,
  windowHeight: number,
  wallSettings: WallState,
};

interface Three {
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera,
  renderer: THREE.WebGLRenderer,
  initialized: boolean,
}

class Three extends React.Component {
  static defaultProps = {
  }

  constructor(props:PropsType) {
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
  }

  render3D() {
    this.renderer.render(this.scene, this.camera);
  }

  render() {
    console.log(this.initialized);
    if(this.initialized === false) {
      this.initialized = true;
      this.render3D();
      return <div>aap</div>;
    }
    this.render3D();
    return false;
  }
}

export default Three;
