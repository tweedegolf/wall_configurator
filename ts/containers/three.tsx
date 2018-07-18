import React from 'react';
import * as THREE from 'three';
import { connect } from 'react-redux';
import OrbitControls from '../../lib/OrbitControls';
import {AppState, Block, ColladaData} from '../interfaces';
import createWall from '../wall/create_wall';
import {updateGeometry} from '../wall/utils';
import calculateHoles from '../reducers/calculate_holes';

interface PropsTypeInternal {
  blocks: Array<Block>,
  colladas: Array<ColladaData>,
  width: number,
  height: number,
  thickness: number,
};

interface PropsTypeExternal {
  element: HTMLDivElement
};

interface Three {
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera,
  renderer: THREE.WebGLRenderer,
  wall: THREE.Mesh,
  element: HTMLDivElement,
  boundResize: (e:Event) => void
}

const mapStateToProps = (state: AppState):PropsTypeInternal => {
  const {
    blocks,
    colladas,
    width,
    height,
    thickness,
  } = calculateHoles(state);
  return {
    blocks,
    colladas,
    width,
    height,
    thickness,
  }
}

class Three extends React.Component<PropsTypeExternal & PropsTypeInternal, void> {
  static defaultProps = {
  }

  constructor(props:PropsTypeExternal & PropsTypeInternal) {
    super(props);
    this.element = props.element;
    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(75, 1920/1080, 1, 100000);
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

  render3D(props?:PropsTypeInternal):void {
    if (props) {
      while (this.wall.children.length){
        this.wall.remove(this.wall.children[0]);
      }
      props.colladas.forEach(collada => {
        collada.model.scale.set(collada.scale, collada.scale, collada.scale);
        collada.model.position.x = collada.x + (collada.width / 2);
        collada.model.position.y = collada.y;
        collada.model.position.z = collada.z;
        this.wall.add(collada.model);
      });
      updateGeometry(this.wall.geometry, props.thickness, props.blocks, props.colladas);
      this.wall.position.x = -props.width / 2;
      const repeatX = (props.width / 500) * 3;
      const repeatY = (props.height / 350) * 3;
      // console.log(repeatX, repeatY);
      this.wall.material.map.repeat.set(repeatX, repeatY);
    }
    this.renderer.render(this.scene, this.camera);
  }

  render() {
    this.render3D(this.props);
    return false;
  }
}

export default connect(mapStateToProps)(Three);
