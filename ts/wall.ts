import * as R from 'ramda';
import * as THREE from 'three';
import wallTexture from '../img/kilimanjaro.jpg';

const canvas:(HTMLElement | null) = document.getElementById('tmp');
let ctx:(CanvasRenderingContext2D | null) = null;
if(canvas instanceof HTMLCanvasElement) {
  ctx = canvas.getContext('2d');
}

if(ctx instanceof CanvasRenderingContext2D) {
  // ctx.scale(-1, 1);
  // ctx.setTransform(1, 0, 0, 1, 0, 0);
}

interface PaneSettings {
  x:number,
  y:number,
  z:number,
  width:number,
  height:number,
  depth:number,
};

interface Hole {
  x: number,
  y: number,
  width: number,
  height: number,
  id: number,
};

interface Block {
  x: number,
  x2: number,
  y: number,
  y2: number,
  width: number,
  height: number,
};

export interface WallSettings {
  wallWidth: number,
  wallHeight: number,
  wallThickness: number,
  holes: Array<Hole>,
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
  console.log(r);
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
  console.log(blocks);
  console.log('---');
  console.log(holes);

  holes.forEach((hole) => {
    if(ctx instanceof CanvasRenderingContext2D) {
      ctx.beginPath();
      ctx.strokeStyle = '#ff0000';
      ctx.lineWidth = 6;
      ctx.rect(hole.x, hole.y, hole.width, hole.height);
      ctx.stroke();
    }
  });

  blocks.forEach((block) => {
    if(ctx instanceof CanvasRenderingContext2D) {
      ctx.beginPath();
      ctx.lineWidth = 0.3;
      ctx.strokeStyle = '#000000';
      ctx.rect(block.x, block.y, block.width, block.height);
      ctx.stroke();
    }
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



  if(ctx instanceof CanvasRenderingContext2D) {
    // ctx.scale(1, -1);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
  }

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
