import React, { useState } from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import {
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
} from '@material-ui/core';
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';

import PaletteMetaForm from './PaletteMetaForm';

import useStyles from './styles/PaletteFormNavStyles';

export default function PaletteFormNav({
  open,
  handleSubmit,
  palettes,
  handleDrawerOpen,
}) {
  const classes = useStyles();
  const [formShowing, updateShowing] = useState(false);

  const onShowForm = () => updateShowing(true);
  
  const onHideForm = () => updateShowing(false);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        color="default"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <AddToPhotosIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Create a Palette
          </Typography>
        </Toolbar>
        <div className={classes.navBtns}>
          <Link to="/">
            <Button
              variant="contained"
              color="secondary"
              type="submit"
              className={classes.navBtn}
            >
              Go Back
            </Button>
          </Link>
          <Button
            variant="contained"
            color="primary"
            onClick={onShowForm}
            className={classes.navBtn}
          >
            Save
          </Button>
        </div>
      </AppBar>
      {formShowing && (
        <PaletteMetaForm
          handleSubmit={handleSubmit}
          palettes={palettes}
          onCloseForm={onHideForm}
        />
      )}
    </div>
  )
}