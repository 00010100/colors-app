import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/styles';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import clsx from 'clsx';

import styles from './styles/ColorBoxStyles';

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

    return (
      <CopyToClipboard text={background} onCopy={this.changeCopyState}>
        <div style={{ background }} className={classes.ColorBox}>
          <div
            style={{ background }} 
            className={clsx(classes.copyOverlay, { [classes.showOverlay]: copied })} 
          />
          <div className={clsx(classes.copyMsg, {
              [classes.showCopyMsg]: copied
            })}
          >
            <h1>Copied!</h1>
            <p className={classes.copyText}>{background}</p>
          </div>
          <div>
            <div className={classes.boxContent}>
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