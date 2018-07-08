import React from 'react'

interface PropTypes {
  max: number,
  min: number,
  value: number
  id?: string,
  label?: string,
  onChange: Function,
  onMouseDown?: Function,
  onMouseUp?: Function,
  step?: number,
  type?: string,
};

interface Slider {
  props: PropTypes,
};


/* React wrapper for input type Range */
class Slider extends React.Component{
  static defaultProps = {
    step: 1,
  }
  render(){
    let value = this.props.value
    let id = this.props.id || `slider-${Date.now()}`;

    function createLabel(props:PropTypes){
      let label = `${value}`;
      if(props.label){
        label = props.label + ': <em>' + value + '</em>'
      }
      return {__html: label}
    }

    return (
      <div id={this.props.id}>
        <label htmlFor={id} dangerouslySetInnerHTML={createLabel(this.props)} />
        <input
          key={this.props.type}
          type="range"
          defaultValue={`${value}`}
          min={this.props.min}
          max={this.props.max}
          step={this.props.step}
          onChange={this.props.onChange}
          onMouseUp={this.props.onMouseUp}
          onMouseDown={this.props.onMouseDown}
        />
      </div>
    )
  }
}

export default Slider
