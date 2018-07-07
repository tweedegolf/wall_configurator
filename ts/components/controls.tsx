import React from 'react';
import PropTypes from 'prop-types';
import InputRange from 'react-input-range';

interface Controls {
};

interface PropsType {
  width: number,
  height: number,
  thickness: number,
  addHole: Function,
};

class Controls extends React.Component {
  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    thickness: PropTypes.number,
    addHole: PropTypes.func,
  }
  static defaultProps = {
  }
  props: PropsType
  render() {
    return (<div>
      <InputRange
        minValue={10}
        maxValue={5000}
        value={this.props.width}
      />
    </div>);
  }
}

