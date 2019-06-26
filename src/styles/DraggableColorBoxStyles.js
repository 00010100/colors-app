export default {
  root: {
    position: 'relative',
    cursor: 'pointer',

    '&:hover svg': {
      color: 'white',
      transform: 'scale(1.5)',
    },
  },
  boxContent: {
    width: '100%',
    left: 0,
    bottom: 0,
    position: 'absolute',
    padding: '10px',
    color: 'rgba(0,0,0,0,.5)',
    letterSpacing: '1px',
    textTransform: 'uppercase',
    fontSize: '12px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  deleteIcon: {
    transition: 'all 0.3s ease-in-out',
  },
}