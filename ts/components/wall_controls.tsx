import React from 'react';
import Slider from './slider';

interface WallControlsProps {
  width: number,
  height: number,
  thickness: number,
  addHole: Function,
  updateWallWidth: Function,
  updateWallHeight: Function,
  updateWallThickness: Function,
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
      max={3000}
      label="thickness"
      value={props.thickness}
      onChange={props.updateWallThickness}
    />
    <button
      onClick={props.addHole}
    >add hole</button>
  </div>
);

export default WallControls;