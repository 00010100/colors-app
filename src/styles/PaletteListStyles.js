import sizes from './sizes';
import bg from './bg.svg';

export default {
  root: {
    height: '100vh',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: '#5149AA',
    /* background by SVGBackgrounds.com */
    backgroundImage: `url(${bg})`,
    overflow: 'auto',
  },
  heading: {
    fontSize: '2rem',
    textShadow: '2px 2px black',

    [sizes.down('xs')]: {
      width: '100%',
      textAlign: 'center',
      fontSize: '1.5rem',
      margin: '1rem 0',
    }
  },
  subHead: {
    fontSize: '1.2rem',
    margin: 0,
    fontWeight: 700,
    borderBottom: '2px solid white',
    textShadow: '2px 2px black',

    [sizes.down('xs')]: {
      margin: '1rem auto',
    }
  },
  container: {
    width: '50%',
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'column',
    flexWrap: 'wrap',
    paddingBottom: 60,

    [sizes.down('xl')]: {
      width: '80%',
    },

    [sizes.down('md')]: {
      width: '70%',
    },

    [sizes.down('xs')]: {
      width: '75%',
    },
  },
  nav: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: 'white',

    '& a': {
      color: 'white',
      textDecoration: 'none',

      '&:hover': {
        color: 'rgba(255,255,255,0.5)',
      }
    },

    [sizes.down('xs')]: {
      flexWrap: 'wrap',
    }
  },
  palettes: {
    boxSizing: 'border-box',
    width: '100%',
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridGap: '1.5rem',

    [sizes.down('xl')]: {
      gridGap: '3rem',
    },

    [sizes.down('lg')]: {
      gridGap: '1.5rem',
    },

    [sizes.down('md')]: {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },

    [sizes.down('xs')]: {
      gridTemplateColumns: '1fr',
      gridGap: '1rem',
    },
  }
};