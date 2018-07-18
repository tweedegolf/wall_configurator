import React from 'react';
import Slider from './slider';
import { ColladaModel } from '../interfaces';

interface WallControlsProps {
  width: number,
  height: number,
  thickness: number,
  colladaModels: Array<ColladaModel>
  addCollada: (...a:Array<any>) => any,
  updateWallWidth: (...a:Array<any>) => any,
  updateWallHeight: (...a:Array<any>) => any,
  updateWallThickness: (...a:Array<any>) => any,
};

const WallControls = (props:WallControlsProps) => (
  <div>
    <Slider
      min={10}
      max={3000}
      label="width"
      value={props.width}
      onChange={props.updateWallWidth}
    />
    <Slider
      min={10}
      max={5000}
      label="height"
      value={props.height}
      onChange={props.updateWallHeight}
    />
    <Slider
      min={10}
      max={250}
      label="thickness"
      value={props.thickness}
      onChange={props.updateWallThickness}
    />
    <select onChange={props.addCollada} value={0}>
      <option key="select-collada" id="select-collada">add collada</option>
      {props.colladaModels.map(collada =>
        <option key={collada.id} id={collada.id}>{collada.name.toLowerCase()}</option>
      )}
    </select>
  </div>
);

export default WallControls;