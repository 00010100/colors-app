import React, { Component } from 'react';

import ColorBox from './ColorBox';

import './Palette.css';
import Navbar from './Navbar';

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
        <Navbar level={level} changeLevel={this.changeLevel} />
        <div className="Palette-colors">
          {colorBoxes}
        </div>
        {/* Footer */}
      </div>
    )
  }
}