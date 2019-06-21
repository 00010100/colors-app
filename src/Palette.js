import React, { Component } from 'react';

import { generatePalette } from './colorHelpers';
import ColorBox from './ColorBox';

import './Palette.css';
import seedColors from './seedColors';

export default class Palette extends Component {
  render() {
    console.log(generatePalette(seedColors[4]));
    const colorBoxes = this.props.colors.map(color => (
      <ColorBox key={color.name} background={color.color} name={color.name} />
    ));

    return (
      <div className="Palette">
        {/* Navbar here */}
        <div className="Palette-colors">
          {colorBoxes}
        </div>
        {/* Footer */}
      </div>
    )
  }
}