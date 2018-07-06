import {Math as Math2} from 'three';
import * as dat from 'dat.gui';

const {
  degToRad,
  radToDeg,
} = Math2;

import {WallSettings} from './wall';

const createDatGUIControls = (settings: WallSettings, update: Function) => {
  const gui = new dat.GUI();
  gui.domElement.style.zIndex = '1000';
  gui.domElement.style.top = '100px';
  const wall:{[index:string]: number} = {};
  wall['Wall width'] = settings.wallWidth;
  wall['Wall height'] = settings.wallHeight;
  wall['Wall thickness'] = settings.wallThickness;

  const hole:{[index:string]: number} = {};
  hole['Hole x'] = settings.holeX;
  hole['Hole y'] = settings.holeY;
  hole['Hole width'] = settings.holeWidth;
  hole['Hole height'] = settings.holeHeight;

  gui.add(wall, 'Wall width', 100, 2000).onChange((value:number) => {
    settings.wallWidth = Math.round(value);
    update(settings);
  });

  gui.add(wall, 'Wall height', 100, 500).onChange((value:number) => {
    settings.wallHeight = Math.round(value);
    update(settings);
  });

  gui.add(wall, 'Wall thickness', 1, 50).onChange((value:number) => {
    settings.wallThickness = Math.round(value);
    update(settings);
  });

  gui.add(hole, 'Hole x', 0, 1500).onChange((value:number) => {
    settings.holeX = Math.round(value);
    update(settings);
  });

  gui.add(hole, 'Hole y', 0, 1500).onChange((value:number) => {
    settings.holeY = Math.round(value);
    update(settings);
  });

  gui.add(hole, 'Hole width', 0, 1500).onChange((value:number) => {
    settings.holeWidth = Math.round(value);
    update(settings);
  });

  gui.add(hole, 'Hole height', 0, 1500).onChange((value:number) => {
    settings.holeHeight = Math.round(value);
    update(settings);
  });
}

export default createDatGUIControls;