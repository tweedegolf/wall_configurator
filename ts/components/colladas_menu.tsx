import React from 'react';
import {curry} from 'ramda';
import ColladaControls from './collada_controls';
import { ColladaData, GenericFunction } from '../interfaces';

interface ColladasMenuProps {
  wallWidth: number,
  wallHeight: number,
  wallThickness: number,
  colladas: Array<ColladaData>
  removeCollada: GenericFunction,
  updateColladaX: GenericFunction,
  updateColladaY: GenericFunction,
  updateColladaZ: GenericFunction,
  updateColladaScale: GenericFunction,
};


const ColladasMenu = (props:ColladasMenuProps) => (
  <div>
    {props.colladas.map((collada) =>
      <ColladaControls
        id={collada.id}
        name={collada.modelName}
        x={collada.x}
        y={collada.y}
        z={collada.z}
        scale={collada.scale}
        wallWidth={props.wallWidth}
        wallHeight={props.wallHeight}
        wallThickness={props.wallThickness}
        removeCollada={props.removeCollada}
        updateColladaX={curry(props.updateColladaX)(collada.id)}
        updateColladaY={curry(props.updateColladaY)(collada.id)}
        updateColladaZ={curry(props.updateColladaZ)(collada.id)}
        updateColladaScale={curry(props.updateColladaScale)(collada.id)}
      />
    )}
  </div>
);

export default ColladasMenu;