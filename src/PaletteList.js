import React, { useState, memo } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/styles';
import {
  Dialog,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  DialogTitle,
} from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close'; 
import blue from '@material-ui/core/colors/blue';
import red from '@material-ui/core/colors/red';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import MiniPalette from './MiniPalette';

import styles from './styles/PaletteListStyles';

const PaletteList = memo(({ palettes, classes, deletePalette, history }) => {
  const [openDeleteDialog, updateDeleteDialog] = useState(false);
  const [delId, setDelId] = useState(null);

  const goToPalette = (id) => () => history.push(`/palette/${id}`);

  const handleDelete = () => {
    deletePalette(delId);
    closeDialog();
  }

  const openDialog = (id) => (e) => {
    e.stopPropagation();
    setDelId(id);
    updateDeleteDialog(true);
  }

  const closeDialog = () => {
    setDelId(null);    
    updateDeleteDialog(false);
  }

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <nav className={classes.nav}>
          <h1 className={classes.heading}>React colors</h1>
          <p className={classes.subHead}><Link to="/palette/new">Create Palette</Link></p>
        </nav>
          <TransitionGroup className={classes.palettes}>
            {palettes.map(palette => (
              <CSSTransition
                key={palette.id}
                classNames="page"
                timeout={500}
              >
                <MiniPalette
                  {...palette}
                  key={palette.id}
                  openDialog={openDialog(palette.id)}
                  handleClick={goToPalette(palette.id)}
                />
              </CSSTransition>
            ))}
        </TransitionGroup>
      </div>
      <Dialog open={openDeleteDialog} aria-labelledby="delete-dialog-title" onClose={closeDialog}>
        <DialogTitle id="delete-dialog-title">Delete this Palette?</DialogTitle>
        <List>
          <ListItem button onClick={handleDelete}>
            <ListItemAvatar>
              <Avatar style={{ backgroundColor: blue[100], color: blue[600] }}>
                <CheckIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Delete" />
          </ListItem>
          <ListItem button onClick={closeDialog}>
            <ListItemAvatar>
              <Avatar  style={{ backgroundColor: red[100], color: red[600] }}>
                <CloseIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Cancel" />
          </ListItem>
        </List>
      </Dialog>
    </div>
  )
});

export default withStyles(styles)(PaletteList);