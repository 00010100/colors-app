import React from 'react'
import { withStyles } from '@material-ui/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import { SortableElement } from 'react-sortable-hoc';

import styles from './styles/DraggableColorBoxStyles';

const DraggableColorBox = SortableElement(({ backgroundColor, name, handleDelete, classes }) => {
  return (
    <div className={classes.root} style={{ backgroundColor }}>
      <div className={classes.boxContent}>
        <span> {name}</span>
        <DeleteIcon className={classes.deleteIcon} onClick={handleDelete} />
      </div>
    </div>
  )
});

export default withStyles(styles)(DraggableColorBox);