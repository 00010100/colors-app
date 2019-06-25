import React, { useState, useEffect } from 'react';
import {
  toLower,
  all,
  equals,
  not,
} from 'ramda';
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
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { makeStyles } from '@material-ui/core/styles';

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
  navBtn: {

  }
}));

export default function PaletteFormNav({
  open,
  handleSubmit,
  palettes,
  handleDrawerOpen,
}) {
  const classes = useStyles();

  useEffect(() => {
    ValidatorForm.addValidationRule('isPaletteNameUnique', (value) => (
      all(({ paletteName }) => not(equals(toLower(paletteName), toLower(value))), palettes)
    ));
  }, [palettes]);

  const [paletteName, updatePaletteName] = useState('');

  const handleChange = (e) => updatePaletteName(e.target.value);
  
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
        <div className={classes.navBtn}>
          <ValidatorForm onSubmit={handleSubmit(paletteName)}>
            <TextValidator
              name="paletteName"
              value={paletteName}
              onChange={handleChange}
              validators={['required', 'isPaletteNameUnique']}
              errorMessages={[
                'Enter palette name.',
                'Palette name already used.'
              ]}
            />
            <Button
              variant="contained"
              color="primary"
              type="submit"
            >
              Save Palette
            </Button>
          </ValidatorForm>
          <Link to="/">
            <Button
              variant="contained"
              color="secondary"
              type="submit"
            >
              Go Back
            </Button>
          </Link>
        </div>
      </AppBar>
    </div>
  )
}