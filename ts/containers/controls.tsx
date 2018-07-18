import * as R from 'ramda';
import React, { SyntheticEvent } from 'react';
import {connect} from 'react-redux';
import WallControls from '../components/wall_controls';
import ColladasMenu from '../components/colladas_menu';
import {
  updateWallWidth,
  updateWallHeight,
  updateWallThickness,
  addCollada,
  removeCollada,
  updateColladaX,
  updateColladaY,
  updateColladaZ,
  updateColladaScale,
} from '../actions';
import {AppState, ColladaData, GenericFunction, ColladaModel} from '../interfaces';

interface Controls {
  props:PropTypes
};

interface PropTypes {
  width: number,
  height: number,
  thickness: number,
  colladas: Array<ColladaData>
  colladaModels: Array<ColladaModel>
  updateWallWidth: GenericFunction,
  updateWallHeight: GenericFunction,
  updateWallThickness: GenericFunction,
  addCollada: GenericFunction,
  removeCollada: GenericFunction,
  updateColladaX: GenericFunction,
  updateColladaY: GenericFunction,
  updateColladaZ: GenericFunction,
  updateColladaScale: GenericFunction,
};

const mapStateToProps = (state:AppState) => {
  const allModels = state.wall.colladaModels;
  const models = Object.keys(allModels)
  .map(key => allModels[key]);
  return {
    width: state.wall.width,
    height: state.wall.height,
    thickness: state.wall.thickness,
    colladas: R.reverse(R.sortBy(R.prop('index'))(state.wall.colladas)),
    colladaModels: models,
  };
};

const mapDispatchToProps = (dispatch:GenericFunction) => {
  return {
    updateWallWidth: (e:any) => {
      dispatch(updateWallWidth(e.target.value));
    },
    updateWallHeight: (e:any) => {
      dispatch(updateWallHeight(e.target.value));
    },
    updateWallThickness: (e:any) => {
      dispatch(updateWallThickness(e.target.value));
    },
    addCollada: (e:any) => {
      e.stopPropagation();
      const selected = e.target.selectedIndex;
      const option = e.target.options[selected];
      // console.log(option);
      dispatch(addCollada(option.id));
    },
    removeCollada: (id:string) => {
      dispatch(removeCollada(id));
    },
    updateColladaX: (id:string, e:any) => {
      dispatch(updateColladaX(id, e.target.value));
    },
    updateColladaY: (id:string, e:any) => {
      dispatch(updateColladaY(id, e.target.value));
    },
    updateColladaZ: (id:string, e:any) => {
      dispatch(updateColladaZ(id, e.target.value));
    },
    updateColladaScale: (id:string, e:any) => {
      dispatch(updateColladaScale(id, e.target.value));
    },
  }
}

class Controls extends React.Component {
  static defaultProps = {
    width: 100,
    height: 100,
    thickness: 10,
  }
  render() {
    return (<div id="controls">
      <h2>Wall settings</h2>
      <div id="wall">
        <WallControls
          width={this.props.width}
          height={this.props.height}
          thickness={this.props.thickness}
          colladaModels={this.props.colladaModels}
          updateWallWidth={this.props.updateWallWidth}
          updateWallHeight={this.props.updateWallHeight}
          updateWallThickness={this.props.updateWallThickness}
          addCollada={this.props.addCollada}
          />
      </div>
      <h2>Colladas</h2>
      <div id="colladas">
        <ColladasMenu
          colladas={this.props.colladas}
          removeCollada={this.props.removeCollada}
          updateColladaX={this.props.updateColladaX}
          updateColladaY={this.props.updateColladaY}
          updateColladaZ={this.props.updateColladaZ}
          updateColladaScale={this.props.updateColladaScale}
          wallWidth={this.props.width}
          wallHeight={this.props.height}
          wallThickness={this.props.thickness}
        />
      </div>
    </div>);
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Controls);



