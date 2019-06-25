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

export default function PaletteFormNav({
  classes,
  open,
  handleSubmit,
  palettes,
  handleDrawerOpen,
}) {
  useEffect(() => {
    ValidatorForm.addValidationRule('isPaletteNameUnique', (value) => (
      all(({ paletteName }) => not(equals(toLower(paletteName), toLower(value))), palettes)
    ));
  }, [palettes]);

  const [paletteName, updatePaletteName] = useState('');

  const handleChange = (e) => updatePaletteName(e.target.value);
  
  return (
    <div>
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
            Persistent drawer
          </Typography>
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
            <Link to="/">
              <Button
                variant="contained"
                color="secondary"
                type="submit"
              >
                Go Back
              </Button>
            </Link>
            <Button
              variant="contained"
              color="primary"
              type="submit"
            >
              Save Palette
            </Button>
          </ValidatorForm>
        </Toolbar>
      </AppBar>
    </div>
  )
}