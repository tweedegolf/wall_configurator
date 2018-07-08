import React from 'react';
import Slider from './slider_wrapper';

interface Controls {
  props:PropTypes
};

interface PropTypes {
  width: number,
  height: number,
  // thickness: number,
  // addHole: Function,
};

class Controls extends React.Component {
  static defaultProps = {
    width: 500,
    height: 300,
  }
  render() {
    return (<div>
      controls
      <Slider
        min={10}
        max={5000}
        value={this.props.width}
      />
      <Slider
        min={10}
        max={5000}
        value={this.props.height}
      />
      </div>);
  }
}

export default Controls;



