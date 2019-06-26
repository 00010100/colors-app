import sizes from './sizes';

export default {
  colorBoxList: {
    width: '100%',
    height: '100%',
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gridTemplateRows: 'repeat(4, 25%)',

    [sizes.down('lg')]: {
      gridTemplateColumns: 'repeat(4, 1fr)',
      gridTemplateRows: 'repeat(5, 20%)',
    },
  
    [sizes.down('md')]: {
      gridTemplateColumns: 'repeat(2, 1fr)',
      gridTemplateRows: 'repeat(10, 10%)',
    },
  
    [sizes.down('sm')]: {
      gridTemplateColumns: 'repeat(1, 1fr)',
      gridTemplateRows: 'repeat(20, 5%)',
    },
  },
}