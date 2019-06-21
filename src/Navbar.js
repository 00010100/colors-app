import React, { Component } from 'react';
import { Select, MenuItem, Snackbar, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import Slider from 'rc-slider';

import 'rc-slider/assets/index.css';
import './Navbar.css';

export default class Navbar extends Component {
  state = { format: 'hex', open: false };

  handleFormatChange = (e) => {
    const { value } = e.target;
    this.setState({ format: value, open: true });
    this.props.changeFormat(value);
  };
  
  closeSnackbar = () => {
    this.setState({ open: false });
  };

  render() {
    const { level, changeLevel } = this.props;
    const { format, open } = this.state;

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
          <Select value={format} onChange={this.handleFormatChange}>
            <MenuItem value="hex">HEX - #ffffff</MenuItem>
            <MenuItem value="hex">HEX - ffffff</MenuItem>
            <MenuItem value="rgb">RGB - rgb(255,255,255)</MenuItem>
            <MenuItem value="rgba">RGBA - rgba(255,255,255,1.0)</MenuItem>
          </Select>
        </div>
        <Snackbar 
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          onClose={this.closeSnackbar}
          open={open}
          autoHideDuration={3000}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          message={<span id="message-id">Format changed to {format.toUpperCase()}</span>}
          action={[
            <IconButton
              onClick={this.closeSnackbar}
              key="close"
              color="inherit"
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          ]}
        />
      </header>
    )
  }
}
