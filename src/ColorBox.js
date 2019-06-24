import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import chroma from 'chroma-js';
import { withStyles } from '@material-ui/styles';

import { CopyToClipboard } from 'react-copy-to-clipboard';

import './ColorBox.css';

const styles = {
  ColorBox: {
    width: '20%',
    height: ({ showingFullPalette }) => showingFullPalette ? '25%' : '50%',
    margin: '0 auto',
    display: 'inline-block',
    position: 'relative',
    cursor: 'pointer',
    marginBottom: '-3.5px',

    '&:hover button': {
      opacity: 1,
      transition: '0.25s',
    }
  },
  copyText: {
    color: ({ background }) => (
      chroma(background).luminance() >= 0.7 ? 'black' : 'white'
    ),
  },
  colorName: {
    color: ({ background }) => (
      chroma(background).luminance() <= 0.08 ? 'white' : 'black'
    ),
  },
  seeMore: {
    backgroundColor: 'rgba(255,255,255, 0.3)',
    width: '60px',
    height: '30px',
    position: 'absolute',
    right: '0',
    bottom: '0',
    border: 'none',
    color: ({ background }) => (
      chroma(background).luminance() >= 0.7 ? 'rgba(0,0,0,0.6)' : 'white'
    ),
    textAlign: 'center',
    lineHeight: '30px',
    textTransform: 'uppercase',
  },
  copyButton: {
    width: '100px',
    height: '30px',
    position: 'absolute',
    display: 'inline-block',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
    outline: 'none',
    background: 'rgba(255,255,255, 0.3)',
    fontSize: '1rem',
    lineHeight: '30px',
    color: ({ background }) => (
      chroma(background).luminance() >= 0.7 ? 'rgba(0,0,0,0.6)' : 'white'
    ),
    textTransform: 'uppercase',
    border: 'none',
    textDecoration: 'none',
    opacity: 0,
  },
}

class ColorBox extends Component {
  state = {
    copied: false,
  };

  changeCopyState = () => {
    this.setState({ copied: true }, () => {
      setTimeout(() => this.setState({ copied: false }), 1500);
    });
  }

  render() {
    const { background, name, moreUrl, showingFullPalette, classes } = this.props;
    const { copied } = this.state;
    
    const isCopied = copied && 'show';

    return (
      <CopyToClipboard text={background} onCopy={this.changeCopyState}>
        <div style={{ background }} className={classes.ColorBox}>
          <div style={{ background }} className={`copy-overlay ${isCopied}`} />
          <div className={`copy-msg ${isCopied}`}>
            <h1>Copied!</h1>
            <p className={classes.copyText}>{background}</p>
          </div>
          <div className="copy-container">
            <div className="box-content">
              <span className={classes.colorName}>{name}</span>
            </div>
            <button className={classes.copyButton}>Copy</button>
          </div>
          {
            showingFullPalette && (
              <Link to={moreUrl} onClick={e => e.stopPropagation()}>
                <span className={classes.seeMore}>More</span>
              </Link>
            )
          }
        </div>
      </CopyToClipboard>
    )
  }
}

export default withStyles(styles)(ColorBox);