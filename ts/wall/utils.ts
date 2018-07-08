import * as THREE from 'three';
import createBlock from './create_block';
import {Hole, Block} from '../interfaces';


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

const isWall = (block:Block, holes:Array<Hole>) => {
  let r = 0
  holes.forEach((hole) => {
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

const updateGeometry = (geom:THREE.Geometry, thickness: number, blocks:Array<Block>, holes:Array<Hole>) => {
  geom.vertices = [];
  geom.faces = [];

  blocks.forEach((block) => {
    if (isWall(block, holes)) {
      createBlock(geom, {
        x: block.x,
        y: block.y,
        z: 0,
        width: block.width,
        height: block.height,
        depth: thickness,
      });
    }
  });

  geom.mergeVertices();
  geom.verticesNeedUpdate = true;
  geom.uvsNeedUpdate = true;
  geom.normalsNeedUpdate = true;
  generateUVs(geom);
  geom.computeFaceNormals();
  geom.elementsNeedUpdate = true;
}

export {
  updateGeometry,
  generateUVs,
};