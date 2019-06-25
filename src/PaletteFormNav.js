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
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';

import PaletteMetaForm from './PaletteMetaForm';

const drawerWidth = 400;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  navBtns: {
    marginRight: '1rem',

    '& a': {
      textDecoration: 'none',
    }
  },
  navBtn: {
    margin: '0 0.5rem',
  },
}));

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
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
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
            Save Palette
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