import React from 'react';
import Slider from './slider';

interface ColladaControlsProps {
  id: string,
  x: number,
  y: number,
  wallWidth: number,
  wallHeight: number,
  updateColladaX: Function,
  updateColladaY: Function,
  removeCollada: Function,
};

const ColladaControls = (props:ColladaControlsProps) => (
  <div className="collada" id={props.id}>
    <button onClick={props.removeCollada}>X</button>
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
  </div>
);

export default ColladaControls;