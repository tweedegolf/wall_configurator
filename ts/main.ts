import * as THREE from 'three';
import OrbitControls from '../lib/OrbitControls';
import {createWall, defaultSettings, WallSettings} from './wall';
import createDatGUIControls from './dat-gui';
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, 1920/1080, 0.1, 10000);
camera.position.set(0, 1000, 500);
camera.lookAt(new THREE.Vector3(0, 0, 0));

const axesHelper = new THREE.AxesHelper(400) ;
// scene.add(axesHelper);

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(-300, 600, 800);
scene.add(light);
const helper = new THREE.DirectionalLightHelper(light, 10, 0xff0000);
// scene.add(helper);

const gridHelper = new THREE.GridHelper(1000, 10);
scene.add(gridHelper);

const renderer = new THREE.WebGLRenderer();
renderer.setClearColor(0xfffff0);
renderer.shadowMap.enabled = true;

const controls = new OrbitControls(camera, renderer.domElement);
controls.addEventListener('change', (e:THREE.Event) => {
  render();
});

const render = () => {
  renderer.render(scene, camera);
  // requestAnimationFrame(render);
};

const resize = () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
}

const wall = createWall();
// wall.mesh.position.z = 200;
wall.mesh.castShadow = true;
wall.mesh.receiveShadow = true;
scene.add(wall.mesh);

// createDatGUIControls(defaultSettings, (data: WallSettings) => {
//   wall.update(data);
//   render();
// });

document.body.appendChild(renderer.domElement);
window.addEventListener('resize', resize);
resize();
render();

