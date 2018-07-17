import * as R from 'ramda';
import React from 'react';
import {connect} from 'react-redux';
import WallControls from '../components/wall_controls';
import HoleControls from '../components/hole_controls';
import ColladasMenu from '../components/colladas_menu';
import {
  updateWallWidth,
  updateWallHeight,
  updateWallThickness,
  addHole,
  removeHole,
  updateHoleX,
  updateHoleY,
  updateHoleWidth,
  updateHoleHeight,
  addCollada,
  removeCollada,
  updateColladaX,
  updateColladaY,
} from '../actions';
import {Hole, AppState, ColladaData} from '../interfaces';

interface Controls {
  props:PropTypes
};

interface PropTypes {
  width: number,
  height: number,
  thickness: number,
  holes: Array<Hole>
  allColladas: Array<ColladaData>
  colladas: Array<ColladaData>
  addHole: (...a:Array<any>) => any,
  removeHole: (...a:Array<any>) => any,
  updateWallWidth: (...a:Array<any>) => any,
  updateWallHeight: (...a:Array<any>) => any,
  updateWallThickness: (...a:Array<any>) => any,
  updateHoleX: (...a:Array<any>) => any,
  updateHoleY: (...a:Array<any>) => any,
  updateHoleWidth: (...a:Array<any>) => any,
  updateHoleHeight: (...a:Array<any>) => any,
  addCollada: (...a:Array<any>) => any,
  removeCollada: (...a:Array<any>) => any,
  updateColladaX: (...a:Array<any>) => any,
  updateColladaY: (...a:Array<any>) => any,
};

const mapStateToProps = (state:AppState) => {
  return {
    width: state.wall.width,
    height: state.wall.height,
    thickness: state.wall.thickness,
    holes: R.sortBy(R.prop('index'))(state.wall.holes),
    colladas: state.wall.colladas,
    allColladas: state.wall.allColladas,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateWallWidth: (e) => {
      dispatch(updateWallWidth(e.target.value));
    },
    updateWallHeight: (e) => {
      dispatch(updateWallHeight(e.target.value));
    },
    updateWallThickness: (e) => {
      dispatch(updateWallThickness(e.target.value));
    },
    addHole: () => {
      dispatch(addHole());
    },
    removeHole: (id:string) => {
      dispatch(removeHole(id));
    },
    updateHoleX: (id:string, e) => {
      dispatch(updateHoleX(id, e.target.value));
    },
    updateHoleY: (id:string, e) => {
      dispatch(updateHoleY(id, e.target.value));
    },
    updateHoleWidth: (id:string, e) => {
      dispatch(updateHoleWidth(id, e.target.value));
    },
    updateHoleHeight: (id:string, e) => {
      dispatch(updateHoleHeight(id, e.target.value));
    },
    addCollada: (id:string) => {
      dispatch(addCollada(id));
    },
    removeCollada: (id:string) => {
      dispatch(removeCollada(id));
    },
    updateColladaX: (id:string, e) => {
      dispatch(updateColladaX(id, e.target.value));
    },
    updateColladaY: (id:string, e) => {
      dispatch(updateColladaY(id, e.target.value));
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
          allColladas={this.props.allColladas}
          updateWallWidth={this.props.updateWallWidth}
          updateWallHeight={this.props.updateWallHeight}
          updateWallThickness={this.props.updateWallThickness}
          addHole={this.props.addHole}
          />
      </div>
      <h2>Colladas</h2>
      <ColladasMenu
        colladas={this.props.colladas}
        allColladas={this.props.allColladas}
        addCollada={this.props.addCollada}
        removeCollada={this.props.removeCollada}
        updateColladaX={this.props.updateColladaX}
        updateColladaY={this.props.updateColladaY}
        wallWidth={this.props.width}
        wallHeight={this.props.height}
        wallThickness={this.props.thickness}
      />
      <h2>Holes</h2>
      <div id="holes">
        {this.props.holes.map(hole =>
          <HoleControls
            key={hole.id}
            id={hole.id}
            wallWidth={this.props.width}
            wallHeight={this.props.height}
            x={hole.x}
            y={hole.y}
            width={hole.width}
            height={hole.height}
            removeHole={this.props.removeHole}
            updateHoleX={R.curry(this.props.updateHoleX)(hole.id)}
            updateHoleY={R.curry(this.props.updateHoleY)(hole.id)}
            updateHoleWidth={R.curry(this.props.updateHoleWidth)(hole.id)}
            updateHoleHeight={R.curry(this.props.updateHoleHeight)(hole.id)}
          />
        )}
      </div>
      </div>);
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Controls);



