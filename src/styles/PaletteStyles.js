import sizes from './sizes';

export default {
  Palette: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  colors: {
    height: '90%',
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gridTemplateRows: ({ showingFullPalette }) => (
      showingFullPalette ? 'repeat(4, 25%)' : 'repeat(2, 50%)'
    ),

    [sizes.down('lg')]: {
      gridTemplateColumns: 'repeat(4, 1fr)',
      gridTemplateRows: ({ showingFullPalette }) => (
        showingFullPalette ? 'repeat(5, 20%)' : 'repeat(3, 33.3333%)'
      ),
    },

    [sizes.down('md')]: {
      gridTemplateColumns: 'repeat(2, 1fr)',
      gridTemplateRows: ({ showingFullPalette }) => (
        showingFullPalette ? 'repeat(10, 10%)' : 'repeat(5, 20%)'
      )
    },

    [sizes.down('sm')]: {
      gridTemplateColumns: '1fr',
      gridTemplateRows: ({ showingFullPalette }) => (
        showingFullPalette ? 'repeat(20, 5%)' : 'repeat(10, 10%)'
      )
    },
  },
  goBack: {
    position: 'relative',
    cursor: 'pointer',
    backgroundColor: 'black',

    '& a': {
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
      color: 'white',
      textTransform: 'uppercase',
      border: 'none',
      textDecoration: 'none',
    },
  },
};