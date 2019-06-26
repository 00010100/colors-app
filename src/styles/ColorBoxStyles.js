import chroma from 'chroma-js';

import sizes from './sizes';

export default {
  ColorBox: {
    position: 'relative',
    cursor: 'pointer',

    '&:hover button': {
      opacity: 1,
      transition: '0.25s',
    },
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
    paddingLeft: 10,
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
  boxContent: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    left: 0,
    bottom: 0,
    height: 30,
    position: 'absolute',
    color: 'black',
    letterSpacing: '1px',
    textTransform: 'uppercase',
    fontSize: '12px',
  },
  copyOverlay: {
    opacity: 0,
    zIndex: 0,
    width: '100%',
    height: '100%',
    transition: 'transform 0.6s ease-in-out',
    transform: 'scale(0.1)'
  },
  showOverlay: {
    opacity: 1,
    transform: 'scale(50)',
    zIndex: 10,
    position: 'absolute',
  },
  copyMsg: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '4rem',
    transform: 'scale(0.1)',
    opacity: 0,
    color: 'white',
    zIndex: -1,

    '& h1': {
      fontWeight: 400,
      textShadow: '1px 2px black',
      textTransform: 'uppercase',
      background: 'rgba(255,255,255,0.3)',
      width: '100%',
      textAlign: 'center',
      marginBottom: 0,
      padding: '1rem',

      [sizes.down('xs')]: {
        fontSize: '6rem',
      },
    },

    '& p': {
      fontSize: '2rem',
      fontWeight: 100,
    },
  },
  showCopyMsg: {
    opacity: 1,
    transform: 'scale(1)',
    transition: 'all 0.4s ease-in-out',
    transitionDelay: '0.1s',
    zIndex: 11,
  }
};