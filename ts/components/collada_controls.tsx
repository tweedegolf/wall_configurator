import React from 'react';
import Slider from './slider';
import {GenericFunction} from '../interfaces';

interface ColladaControlsProps {
  id: string,
  x: number,
  y: number,
  z: number,
  scale: number,
  wallWidth: number,
  wallHeight: number,
  wallThickness: number,
  removeCollada: GenericFunction,
  updateColladaX: GenericFunction,
  updateColladaY: GenericFunction,
  updateColladaZ: GenericFunction,
  updateColladaScale: GenericFunction,
};

const ColladaControls = (props:ColladaControlsProps) => (
  <div className="collada" id={props.id}>
    <button onClick={(e) => props.removeCollada(props.id)}>X</button>
    {/* <div>{props.id}</div> */}
    <Slider
      min={0}
      max={props.wallWidth}
      label="x"
      value={props.x}
      onChange={props.updateColladaX}
    />
    <Slider
      min={0}
      max={props.wallHeight}
      label="y"
      value={props.y}
      onChange={props.updateColladaY}
    />
    <Slider
      min={0}
      max={props.wallThickness}
      label="z"
      value={props.z}
      onChange={props.updateColladaZ}
    />
    <Slider
      min={0}
      max={4}
      label="scale"
      value={props.scale}
      onChange={props.updateColladaScale}
      />
  </div>
);

export default ColladaControls;