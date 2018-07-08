import React, {Component} from 'react'
import ReactSlider from './slider'

// wrapper for ReactSlider

interface PropTypes {
  max: number,
  min: number,
  step: number,
  value: number,
  label: string,
  onChange: Function,
  onMouseUp: Function,
  onMouseDown: Function,
  type: string,
};

interface Slider {
  props: PropTypes,
};

class Slider extends Component{
  static displayName = 'Slider'
  render(){

    let {
      min: min = 1,
      max: max = 200,
      step: step = 1,
      value: value = 0,
      onMouseDown: onMouseDown = e => {},
      onMouseUp: onMouseUp = e => {},
    } = this.props

    return (
      <ReactSlider
        min={min}
        max={max}
        step={step}
        type={this.props.type}
        label={this.props.label}
        value={value}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onChange={this.props.onChange}
      />
    )
  }
}

export default Slider;

