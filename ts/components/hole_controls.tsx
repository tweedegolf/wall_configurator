import React from 'react';
import Slider from './slider';

interface HoleControlsProps {
  wallWidth: number,
  wallHeight: number,
  id: string,
  x: number,
  y: number,
  width: number,
  height: number,
  updateHoleX: Function,
  updateHoleY: Function,
  updateHoleWidth: Function,
  updateHoleHeight: Function,
  removeHole: Function,
};

const HoleControls = (props:HoleControlsProps) => (
  <div className="hole" id={props.id}>
    <button onClick={() => { props.removeHole(props.id) }}>X</button>
    <Slider
      min={0}
      max={props.wallWidth}
      label="x"
      value={props.x}
      onChange={props.updateHoleX}
      />
    <Slider
      min={0}
      max={props.wallHeight}
      label="y"
      value={props.y}
      onChange={props.updateHoleY}
      />
    <Slider
      min={0}
      max={props.wallWidth}
      label="width"
      value={props.width}
      onChange={props.updateHoleWidth}
      />
    <Slider
      id={`${props.id}`}
      min={0}
      max={props.wallHeight}
      label="height"
      value={props.height}
      onChange={props.updateHoleHeight}
    />
  </div>
);

export default HoleControls;