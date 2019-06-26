import React from 'react';
import { SortableContainer } from 'react-sortable-hoc';
import { withStyles } from '@material-ui/styles';

import DraggableColorBox from './DraggableColorBox';

import styles from './styles/DraggableColorListStyles';

const DraggableColorList = SortableContainer(({ classes, colors, handleDeleteColor }) => (
  <div className={classes.colorBoxList}>
    {colors.map((color, i) => (
      <DraggableColorBox
        index={i}
        key={color.name}
        backgroundColor={color.color}
        name={color.name}
        handleDelete={handleDeleteColor(color.name)}
      />
    ))}
  </div>
));

export default withStyles(styles)(DraggableColorList);