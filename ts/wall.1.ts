import * as THREE from 'three';
import wallTexture from '../img/kilimanjaro.jpg';

interface PaneSettings {
  x:number,
  y:number,
  z:number,
  width:number,
  height:number,
  depth:number
};

export interface WallSettings {
  wallWidth: number,
  wallHeight: number,
  wallThickness: number,
  holeX: number,
  holeY: number,
  holeWidth: number,
  holeHeight: number,
};

const generateUVs = (geom:THREE.Geometry) => {
  geom.computeBoundingBox();

  const max = geom.boundingBox.max;
  const min = geom.boundingBox.min;
  const offset = new THREE.Vector2(0 - min.x, 0 - min.y);
  const range = new THREE.Vector2(max.x - min.x, max.y - min.y);
  const faces = geom.faces;

  geom.faceVertexUvs[0] = [];

  for (let i = 0; i < faces.length ; i++) {
    const v1 = geom.vertices[faces[i].a];
    const v2 = geom.vertices[faces[i].b];
    const v3 = geom.vertices[faces[i].c];

    geom.faceVertexUvs[0].push([
      new THREE.Vector2((v1.x + offset.x)/range.x ,(v1.y + offset.y)/range.y),
      new THREE.Vector2((v2.x + offset.x)/range.x ,(v2.y + offset.y)/range.y),
      new THREE.Vector2((v3.x + offset.x)/range.x ,(v3.y + offset.y)/range.y)
    ]);
  }
  // geom.uvsNeedUpdate = true;
};


const createPane = (geom:THREE.Geometry, settings: PaneSettings) => {
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

const update = (geom: THREE.Geometry, settings: WallSettings) => {
  geom.vertices = [];
  geom.faces = [];
  // console.log(settings);
  const {
    wallWidth,
    wallHeight,
    wallThickness,
    holeX,
    holeY,
    holeWidth,
    holeHeight,
  } = settings;

  // left of hole
  createPane(geom, {
    x: 0,
    y: 0,
    z: 0,
    width: holeX,
    height: wallHeight,
    depth: wallThickness,
  });

  // right of hole
  createPane(geom, {
    x: holeX + holeWidth,
    y: 0,
    z: 0,
    width: wallWidth - holeX - holeWidth,
    height: wallHeight,
    depth: wallThickness,
  });

  // above hole
  createPane(geom, {
    x: holeX,
    y: holeY + holeHeight,
    z: 0,
    width: holeWidth,
    height: wallHeight - holeY - holeHeight,
    depth: wallThickness,
  });

  // below hole
  createPane(geom, {
    x: holeX,
    y: 0,
    z: 0,
    width: holeWidth,
    height: holeY,
    depth: wallThickness,
  });
  // geom.mergeVertices();
  geom.verticesNeedUpdate = true;
  geom.uvsNeedUpdate = true;
  geom.normalsNeedUpdate = true;
  generateUVs(geom);
  geom.computeFaceNormals();
  geom.elementsNeedUpdate = true;
  // geom.colorsNeedUpdate = true;
}

export const defaultSettings = {
  wallWidth: 500,
  wallHeight: 300,
  wallThickness: 30,
  holeX: 120,
  holeY: 100,
  holeWidth: 260,
  holeHeight: 150,
};

export const createWall = (settings: WallSettings = defaultSettings) => {
  const texture = new THREE.TextureLoader().load(wallTexture);
  // const texture = new THREE.TextureLoader().load('../img/kilimanjaro.jpg');
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(3, 3);
  const material = new THREE.MeshBasicMaterial({map: texture, side: THREE.DoubleSide});
  // material.map.wrapS = THREE.ClampToEdgeWrapping;
  // material.map.wrapT = THREE.ClampToEdgeWrapping;
  // material.map.minFilter = THREE.LinearFilter;

  const geom = new THREE.Geometry();
  update(geom, settings);

  const wall = new THREE.Mesh(geom, material);
  wall.castShadow = true;
  wall.receiveShadow = false;
  return {
    mesh: wall,
    update: (data:WallSettings) => {
      update(geom, data);
    },
  }
};
