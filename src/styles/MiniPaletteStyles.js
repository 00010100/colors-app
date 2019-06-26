export default {
  root: {
    backgroundColor: 'white',
    border: '1px solid black',
    borderRadius: '5px',
    padding: '0.5rem',
    position: 'relative',
    overflow: 'hidden',
    cursor: 'pointer',
    '&:hover $delete': {
      opacity: 1,
    }
  },
  colors: {
    backgroundColor: '#dae1e4',
    width: '100%',
    height: '150px',
    borderRadius: '5px',
    overflow: 'hidden',
  },
  title: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '0',
    paddingTop: '0.5rem',
    fontSize: '1rem',
    position: 'relative'
  },
  emoji: {
    marginLeft: '0.5rem',
    fontSize: '1.5rem'
  },
  miniColor: {
    width: '20%',
    height: '25%',
    display: 'inline-block',
    margin: '0 auto -4px',
    position: 'relative'
  },
  delete: {
    transition: 'all 0.3s ease-in-out',
    opacity: 0,
    zIndex: 10,
    position: 'absolute',
    top: 0,
    right: 0,
  },
  deleteIcon: {
    color: 'white',
    backgroundColor: '#eb3d30',
    width: 20,
    height: 20,
    padding: 10,
    borderBottomLeftRadius: '5px',
    transition: 'all 0.2s ease-in-out',

    '&:hover': {
      backgroundColor: '#e3594e',
    },
  }
};