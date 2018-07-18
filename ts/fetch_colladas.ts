// Loads windows and doors in JSON formats

import * as THREE from 'three';
import { ColladaData } from './interfaces';

const colladaUrls:Array<string> = [
  './colladas/dubbele deur/DubbeleDeur.dae.json',
  './colladas/dubbele deur/DubbeleDeur-donkerbruin.dae.json',
  './colladas/dubbele deur/DubbeleDeur-grijs.dae.json',
  './colladas/dubbele deur/DubbeleDeur-zwart.dae.json',
];

const loader = new THREE.ObjectLoader();

const loadCollada = (url:string) => {
  console.log(url);
  return new Promise((resolve:any, reject:any) => {
    loader.load(url,
      // load
      (model) => {
        const name = url.substring(url.lastIndexOf('/') + 1).replace('.dae.json', '');
        if (model.scene) {
          console.log('does this happen at all?');
          resolve({name, model: model.scene});
        } else {
          resolve({name, model});
        }
      },
      // progress
      () => {
      },
      // error
      () => {
        // console.error(`Collada ${url} could not be loaded`);
        resolve(null);
      });
  })
}

async function fetchColladas() {
  const promises = colladaUrls.map(c => loadCollada(c));
  const results = await Promise.all(promises);
  const colladas:Array<ColladaData> = [];
  results.forEach(result => {
    if (result !== null) {
      const model = result.model;
      model.rotation.x = -Math.PI/2;
      const b = new THREE.Box3();
      b.setFromObject(model);
      colladas.push({
        id: `collada-${Date.now()}`,
        name: result.name,
        model,
        width: Math.round(-b.min.x + b.max.x),
        height: Math.round(-b.min.y + b.max.y),
        depth: Math.round(-b.min.z + b.max.z),
        scale: 1,
        x: 0,
        y: 0,
        z: 0,
      });
    }
  });
  return colladas;
}

export default fetchColladas;