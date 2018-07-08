import React from 'react';
import {connect} from 'react-redux';
import WallControls from '../components/wall_controls';
import HoleControls from '../components/hole_controls';
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
} from '../actions';
import {Hole, AppState} from '../interfaces';

interface Controls {
  props:PropTypes
};

interface PropTypes {
  width: number,
  height: number,
  thickness: number,
  holes: Array<Hole>
  addHole: Function,
  removeHole: Function,
  updateWallWidth: Function,
  updateWallHeight: Function,
  updateWallThickness: Function,
  updateHoleX: Function,
  updateHoleY: Function,
  updateHoleWidth: Function,
  updateHoleHeight: Function,
};

const mapStateToProps = (state:AppState) => {
  console.log(state.wall.holes);
  return {
      width: state.wall.width,
      height: state.wall.height,
      thickness: state.wall.thickness,
      holes: state.wall.holes,
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
    removeHole: (e) => {
      dispatch(removeHole(parseInt(e.target.parentNode.id, 10)));
    },
    updateHoleX: (e) => {
      dispatch(updateHoleX(parseInt(e.target.parentNode.id, 10), e.target.value));
    },
    updateHoleY: (e) => {
      dispatch(updateHoleY(parseInt(e.target.parentNode.id, 10), e.target.value));
    },
    updateHoleWidth: (e) => {
      dispatch(updateHoleWidth(parseInt(e.target.parentNode.id, 10), e.target.value));
    },
    updateHoleHeight: (e) => {
      dispatch(updateHoleHeight(parseInt(e.target.parentNode.id, 10), e.target.value));
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
      <div id="wall">
        <h2>Wall settings</h2>
        <WallControls
          width={this.props.width}
          height={this.props.height}
          thickness={this.props.thickness}
          updateWallWidth={this.props.updateWallWidth}
          updateWallHeight={this.props.updateWallHeight}
          updateWallThickness={this.props.updateWallThickness}
          addHole={this.props.addHole}
        />
        <h2>Hole Settings</h2>
      </div>
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
            updateHoleX={this.props.updateHoleX}
            updateHoleY={this.props.updateHoleY}
            updateHoleWidth={this.props.updateHoleWidth}
            updateHoleHeight={this.props.updateHoleHeight}
          />
        )}
      </div>
      </div>);
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Controls);



