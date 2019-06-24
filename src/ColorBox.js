import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import chroma from 'chroma-js';

import { CopyToClipboard } from 'react-copy-to-clipboard';

import './ColorBox.css';

export default class ColorBox extends Component {
  state = {
    copied: false,
  };

  changeCopyState = () => {
    this.setState({ copied: true }, () => {
      setTimeout(() => this.setState({ copied: false }), 1500);
    });
  }

  render() {
    const { background, name, moreUrl, showLink } = this.props;
    const { copied } = this.state;
    
    const isCopied = copied && 'show';
    const isDarkColor = chroma(background).luminance() <= 0.08 && 'light-text';
    const isLightColor = chroma(background).luminance() >= 0.7 && 'dark-text';

    return (
      <CopyToClipboard text={background} onCopy={this.changeCopyState}>
        <div style={{ background }} className="ColorBox">
          <div style={{ background }} className={`copy-overlay ${isCopied}`} />
          <div className={`copy-msg ${isCopied}`}>
            <h1>Copied!</h1>
            <p className={isLightColor}>{background}</p>
          </div>
          <div className="copy-container">
            <div className="box-content">
              <span className={isDarkColor}>{name}</span>
            </div>
            <button className={`copy-button ${isLightColor}`}>Copy</button>
          </div>
          {
            showLink && (
              <Link to={moreUrl} onClick={e => e.stopPropagation()}>
                <span className={`see-more ${isLightColor}`}>More</span>
              </Link>
            )
          }
        </div>
      </CopyToClipboard>
    )
  }
}