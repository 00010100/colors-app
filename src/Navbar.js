import React, { Component } from 'react';
import { Select, MenuItem } from '@material-ui/core';
import Slider from 'rc-slider';

import 'rc-slider/assets/index.css';
import './Navbar.css';

export default class Navbar extends Component {
  state = { format: 'hex' };

  handleChange = (e) => {
    const { value } = e.target;
    this.setState({ format: value });
    this.props.changeFormat(value);
  };

  render() {
    const { level, changeLevel } = this.props;
    const { format } = this.state;

    return (
      <header className="Navbar">
        <div className="logo">
          <a href="#">reactcolorpicker</a>
        </div>
        <div className="slider-container">
          <span>Level: {level}</span>
          <div className="slider">
            <Slider
              defaultValue={level}
              min={100}
              max={900}
              step={100}
              onAfterChange={changeLevel}
            />
          </div>
        </div>
        <div className="select-container">
          <Select value={format} onChange={this.handleChange}>
            <MenuItem value="hex">HEX - #fff</MenuItem>
            <MenuItem value="rgb">RGB - rgb(255,255,255)</MenuItem>
            <MenuItem value="rgba">RGBA - rgba(255,255,255,1.0)</MenuItem>
          </Select>
        </div>
      </header>
    )
  }
}
