import * as THREE from 'three';
import {PaneSettings} from '../interfaces';

const createBlock = (geom:THREE.Geometry, settings: PaneSettings) => {
  const {
    x,
    y,
    z,
    width,
    height,
    depth
  } = settings;

  // front
  let index = geom.vertices.length;
  geom.vertices.push(
    new THREE.Vector3(x, y, z),
    new THREE.Vector3(x, y + height, z),
    new THREE.Vector3(x + width, y + height, z),
    new THREE.Vector3(x + width, y, z),
  );
  geom.faces.push(
    new THREE.Face3(index, index + 1, index + 2),
    new THREE.Face3(index + 2, index + 3, index)
  );

  // back
  index = geom.vertices.length;
  geom.vertices.push(
    new THREE.Vector3(x, y, z + depth),
    new THREE.Vector3(x, y + height, z + depth),
    new THREE.Vector3(x + width, y + height, z + depth),
    new THREE.Vector3(x + width, y, z + depth),
  );
  geom.faces.push(
    new THREE.Face3(index, index + 1, index + 2),
    new THREE.Face3(index + 2, index + 3, index)
  );

  //top
  index = geom.vertices.length;
  geom.vertices.push(
    new THREE.Vector3(x, y + height, z),
    new THREE.Vector3(x, y + height, z + depth),
    new THREE.Vector3(x + width, y + height, z + depth),
    new THREE.Vector3(x + width, y + height, z),
  );
  geom.faces.push(
    new THREE.Face3(index, index + 1, index + 2),
    new THREE.Face3(index + 2, index + 3, index)
  );

  // bottom
  index = geom.vertices.length;
  geom.vertices.push(
    new THREE.Vector3(x, y, z),
    new THREE.Vector3(x, y, z + depth),
    new THREE.Vector3(x + width, y, z + depth),
    new THREE.Vector3(x + width, y, z),
  );
  geom.faces.push(
    new THREE.Face3(index, index + 1, index + 2),
    new THREE.Face3(index + 2, index + 3, index)
  );

  // left
  index = geom.vertices.length;
  geom.vertices.push(
    new THREE.Vector3(x, y, z),
    new THREE.Vector3(x, y, z + depth),
    new THREE.Vector3(x, y + height, z + depth),
    new THREE.Vector3(x, y + height, z),
  );
  geom.faces.push(
    new THREE.Face3(index, index + 1, index + 2),
    new THREE.Face3(index + 2, index + 3, index)
  );

  // right
  index = geom.vertices.length;
  geom.vertices.push(
    new THREE.Vector3(x + width, y, z),
    new THREE.Vector3(x + width, y, z + depth),
    new THREE.Vector3(x + width, y + height, z + depth),
    new THREE.Vector3(x + width, y + height, z),
  );
  geom.faces.push(
    new THREE.Face3(index, index + 1, index + 2),
    new THREE.Face3(index + 2, index + 3, index)
  );

}

export default createBlock;