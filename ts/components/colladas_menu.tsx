import React from 'react';
import {curry} from 'ramda';
import ColladaControls from './collada_controls';
import { ColladaData } from '../interfaces';

interface ColladasMenuProps {
  wallWidth: number,
  wallHeight: number,
  wallThickness: number,
  updateColladaX: (...a:Array<any>) => any,
  updateColladaY: (...a:Array<any>) => any,
  addCollada: (...a:Array<any>) => any,
  removeCollada: (...a:Array<any>) => any,
  allColladas: Array<ColladaData>
  colladas: Array<ColladaData>
};


const ColladasMenu = (props:ColladasMenuProps) => (
  <div>
    {props.colladas.map((collada) =>
      <ColladaControls
        removeCollada={curry(props.removeCollada)(collada.id)}
        updateColladaX={curry(props.updateColladaX)(collada.id)}
        updateColladaY={curry(props.updateColladaY)(collada.id)}
      />
    )}
  </div>
);

export default ColladasMenu;