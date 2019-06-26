import React, { memo } from 'react';
import { withStyles } from '@material-ui/styles';
import DeleteIcon from '@material-ui/icons/Delete';

import styles from './styles/MiniPaletteStyles';

const MiniPalette = memo(({
  classes,
  paletteName,
  emoji,
  colors,
  handleClick,
  openDialog,
}) => {
  const miniColorBoxes = colors.map(color => (
    <div
      className={classes.miniColor}
      style={{ backgroundColor: color.color }}
      key={color.name}
    />
  ));

  return (
    <div className={classes.root} onClick={handleClick}>
      <div className={classes.delete} onClick={openDialog}>
        <DeleteIcon className={classes.deleteIcon} />
      </div>
      <div className={classes.colors}>{miniColorBoxes}</div>
      <h5 className={classes.title}>
        {paletteName}
        <span className={classes.emoji}>{emoji}</span>
      </h5>
    </div>
  );
});

export default withStyles(styles)(MiniPalette);