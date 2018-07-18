import {Object3D} from 'three';

export interface PaneSettings {
  x:number,
  y:number,
  z:number,
  width:number,
  height:number,
  depth:number,
};

export interface Block {
  x: number,
  x2: number,
  y: number,
  y2: number,
  width: number,
  height: number,
};

export interface ColladaModel {
  name: string,
  id: string,
  model: Object3D,
  width: number,
  height: number,
  depth: number,
};

export interface ColladaData {
  id: string,
  index: number,
  name: string,
  model: Object3D,
  width: number,
  height: number,
  depth: number,
  scale: number,
  x: number,
  y: number,
  z: number,
};

export interface WallState {
  width: number,
  height: number,
  thickness: number,
  colladas: Array<ColladaData>,
  colladaModels: Array<ColladaModel>,
};

export interface AppState {
  wall: WallState,
};

export interface CanvasPreview {
  update: Function
}

export interface ReduxAction {
  type: string,
  payload: {
    [key:string]: any,
  },
}

export interface GenericFunction {
  (...a:Array<any>): any
}
