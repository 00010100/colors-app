import React, { Component } from 'react';

import ColorBox from './ColorBox';
import PaletteFooter from './PaletteFooter';

import './Palette.css';
import Navbar from './Navbar';

export default class Palette extends Component {
  state = { level: 500, format: 'hex' };

  changeLevel = (level) => {
    this.setState({ level });
  }

  changeFormat = (format) => {
    this.setState({ format });
  }

  render() {
    const { palette: { colors, paletteName, emoji, id } } = this.props;
    const { level, format } = this.state;

    const colorBoxes = colors[level].map(color => (
      <ColorBox
        key={color.id}
        background={color[format]}
        name={color.name}
        moreUrl={`/palette/${id}/${color.id}`}
        showLink
      />
    ));

    return (
      <div className="Palette">
        <Navbar
          level={level}
          changeLevel={this.changeLevel}
          changeFormat={this.changeFormat}
          showingAllColors
        />
        <div className="Palette-colors">
          {colorBoxes}
        </div>
        <PaletteFooter />
      </div>
    )
  }
}