import * as R from 'ramda';
import * as THREE from 'three';
import wallTexture from '../img/kilimanjaro.jpg';
import {Hole, Block, WallSettings} from './interfaces';
import createBlock from './create_block';
import {createCanvasPreview} from './canvas_preview';

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
};

const sortOnX = (a:Hole, b:Hole) => {
  if (a.x < b.x) {
    return -1;
  }
  if (a.x > b.x) {
    return 1;
  }
  return 0;
};

const sortOnY = (a:Hole, b:Hole) => {
  if (a.y < b.y) {
    return -1;
  }
  if (a.y > b.y) {
    return 1;
  }
  return 0;
};

const isWall = (block:Block, holes:Array<Hole>) => {
  let r = 0
  holes.forEach((hole, index) => {
    const holeX2 = hole.x + hole.width;
    const holeY2 = hole.y + hole.height;
    if(block.x >= hole.x && block.x2 <= holeX2 && block.y >= hole.y && block.y2 <= holeY2) {
      r += 1;
    }
    // console.log(index, hole.id, 'X', hole.x, holeX2, block.x, block.x2);
    // console.log(index, 'Y', hole.y, holeY2, block.y, block.y2);
  });
  return r === 0;
};

const update = (geom: THREE.Geometry, settings: WallSettings) => {
  geom.vertices = [];
  geom.faces = [];
  // console.log(settings);
  const {
    wallWidth,
    wallHeight,
    wallThickness,
    holes,
  } = settings;

  holes.sort(sortOnX);
  let rasterX:Array<number> = [];
  holes.forEach((hole) => {
    rasterX.push(hole.x);
    rasterX.push(hole.x + hole.width);
  });
  rasterX.sort((a, b) => a - b);
  rasterX = R.uniq(rasterX);
  rasterX.push(wallWidth);

  holes.sort(sortOnY);
  let rasterY:Array<number> = [];
  holes.forEach((hole) => {
    rasterY.push(hole.y);
    rasterY.push(hole.y + hole.height);
  });
  rasterY.sort((a, b) => a - b);
  rasterY = R.uniq(rasterY);
  rasterY.push(wallHeight);

  // console.log(rasterX);
  // console.log(rasterY);

  const blocks:Array<Block> = [];
  let refX = 0;
  rasterX.forEach((lineX) => {
    let refY = 0;
    console.log(refX);
    rasterY.forEach((lineY) => {
      const block:Block = {
        x: refX,
        x2: lineX,
        width: lineX - refX,
        y: refY,
        y2: lineY,
        height: lineY - refY,
      };
      blocks.push(block);
      console.log('   ', refY);
      refY = lineY;
    });
    refX = lineX;
  });

  blocks.forEach((block) => {
    if (isWall(block, holes)) {
      createBlock(geom, {
        x: block.x,
        y: block.y,
        z: 0,
        width: block.width,
        height: block.height,
        depth: wallThickness,
      });
    }
  });

  createCanvasPreview(settings, blocks);

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
  wallHeight: 350,
  wallThickness: 30,
  holes: [
    {
      id: 1,
      x: 300,
      y: 50,
      width: 130,
      height: 100,
    },
    {
      id: 2,
      x: 120,
      y: 150,
      width: 260,
      height: 150,
    },
    {
      id: 3,
      x: 20,
      y: 100,
      width: 150,
      height: 150,
    }
  ],

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
