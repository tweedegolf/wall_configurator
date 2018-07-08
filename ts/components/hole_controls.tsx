import React from 'react';
import Slider from './slider';

interface HoleControlsProps {
  wallWidth: number,
  wallHeight: number,
  id: number,
  x: number,
  y: number,
  width: number,
  height: number,
  updateHoleX: Function,
  updateHoleY: Function,
  updateHoleWidth: Function,
  updateHoleHeight: Function,
};

const HoleControls = (props:HoleControlsProps) => (
  <div>
    <Slider
      id={`{props.id}`}
      min={0}
      max={props.wallWidth}
      label="x"
      value={props.x}
      onChange={props.updateHoleX}
      />
    <Slider
      id={`{props.id}`}
      min={0}
      max={props.wallHeight}
      label="y"
      value={props.y}
      onChange={props.updateHoleY}
      />
    <Slider
      min={0}
      id={`{props.id}`}
      max={props.wallWidth}
      label="width"
      value={props.width}
      onChange={props.updateHoleWidth}
      />
    <Slider
      id={`{props.id}`}
      min={0}
      max={props.wallHeight}
      label="height"
      value={props.height}
      onChange={props.updateHoleHeight}
    />
  </div>
);

export default HoleControls;