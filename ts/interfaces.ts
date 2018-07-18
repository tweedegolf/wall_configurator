import {Group} from 'three';

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
  index: number,
  model: Group,
  width: number,
  height: number,
  depth: number,
};

export interface ColladaData {
  id: string,
  index: number,
  model: Group,
  modelId: string,
  modelName: string,
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
  colladaModels: {[key:string]: ColladaModel},
  colladaIndex: number,
  countPerModel: {[key:string]: number},
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
