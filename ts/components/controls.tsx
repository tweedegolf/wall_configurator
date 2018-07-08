import React from 'react';
import {connect} from 'react-redux';
import Slider from './slider';
import {updateWallWidth, updateWallHeight,updateWallThickness, addHole} from '../actions';

interface Controls {
  props:PropTypes
};

interface PropTypes {
  width: number,
  height: number,
  thickness: number,
  addHole: Function,
  updateWallWidth: Function,
  updateWallHeight: Function,
  updateWallThickness: Function,
};

const mapStateToProps = (state) => {
  // console.log(state.wall.holes.length);
  return {
      width: state.wall.width,
      height: state.wall.height,
      thickness: state.wall.thickness,
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
  }
}

class Controls extends React.Component {
  static defaultProps = {
    width: 100,
    height: 100,
    thickness: 10,
  }
  render() {
    return (<div>
      <Slider
        min={10}
        max={3000}
        label="width"
        value={this.props.width}
        onChange={this.props.updateWallWidth}
        />
      <Slider
        min={10}
        max={5000}
        label="height"
        value={this.props.height}
        onChange={this.props.updateWallHeight}
        />
      <Slider
        min={10}
        max={3000}
        label="thickness"
        value={this.props.thickness}
        onChange={this.props.updateWallThickness}
      />
      <button
        onClick={this.props.addHole}
      >add hole</button>
      </div>);
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Controls);



