import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';

import ColorBox from './ColorBox';
import PaletteFooter from './PaletteFooter';
import Navbar from './Navbar';

import './Palette.css';

const styles = {
  Palette: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  colors: {
    height: '90%',
  },
}

class Palette extends Component {
  state = { level: 500, format: 'hex' };

  changeLevel = (level) => {
    this.setState({ level });
  }

  changeFormat = (format) => {
    this.setState({ format });
  }

  render() {
    const { classes, palette: { colors, paletteName, emoji, id } } = this.props;
    const { level, format } = this.state;

    const colorBoxes = colors[level].map(color => (
      <ColorBox
        key={color.id}
        background={color[format]}
        name={color.name}
        moreUrl={`/palette/${id}/${color.id}`}
        showingFullPalette
      />
    ));

    return (
      <div className={classes.Palette}>
        <Navbar
          level={level}
          changeLevel={this.changeLevel}
          changeFormat={this.changeFormat}
          showingAllColors
        />
        <div className={classes.colors}>
          {colorBoxes}
        </div>
        <PaletteFooter paletteName={paletteName} emoji={emoji} />
      </div>
    )
  }
}

export default withStyles(styles)(Palette);