import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class PaletteList extends Component {
  render() {
    const { palettes } = this.props;

    return (
      <div>
        <h1>React colors</h1>
        {palettes.map(palette => (
          <p key={palette.id}>
            <Link to={`/palette/${palette.id}`}>
              {palette.paletteName}
            </Link>
          </p>
        ))}
      </div>
    )
  }
}
