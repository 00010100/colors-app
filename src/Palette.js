import React, { Component } from 'react';
import Slider from 'rc-slider';

import 'rc-slider/assets/index.css';
import ColorBox from './ColorBox';

import './Palette.css';

export default class Palette extends Component {
  state = { level: 500 };

  changeLevel = (level) => {
    this.setState({ level });
  }

  render() {
    const { palette: { colors } } = this.props;
    const { level } = this.state;

    const colorBoxes = colors[level].map(color => (
      <ColorBox key={color.name} background={color.hex} name={color.name} />
    ));

    return (
      <div className="Palette">
        <div className="slider">
          <Slider
            defaultValue={level}
            min={100}
            max={900}
            step={100}
            onAfterChange={this.changeLevel}
          />
        </div>
        {/* Navbar here */}
        <div className="Palette-colors">
          {colorBoxes}
        </div>
        {/* Footer */}
      </div>
    )
  }
}