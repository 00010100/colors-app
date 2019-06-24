import React, { useState, useEffect } from 'react';
import { filter, toLower, all, equals, not, map, replace, trim } from 'ramda';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {
  Drawer,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Divider,
  IconButton,
  Button,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { ChromePicker } from 'react-color';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

import DraggableColorBox from './DraggableColorBox';

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
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    height: 'calc(100vh - 64px)',
    // padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

export default function NewPaletteForm({ savePalette, palettes, history }) {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const [currColor, updateCurrColor] = useState('teal');
  const [form, updateForm] = useState({
    colorName: '',
    paletteName: '',
  });
  const [colors, setColors] = useState([]);

  useEffect(() => {
    ValidatorForm.addValidationRule('isColorNameUnique', (value) => (
      all(({ name }) => not(equals(toLower(name), toLower(value))), colors)
    ));
    ValidatorForm.addValidationRule('isColorUnique', () => (
      all(({ color }) => not(equals(color, currColor)), colors)
    ));
    ValidatorForm.addValidationRule('isPaletteNameUnique', (value) => (
      all(({ paletteName }) => not(equals(toLower(paletteName), toLower(value))), palettes)
    ));
  }, [colors, currColor, palettes])

  const handleDrawerOpen = () => setOpen(true);

  const handleDrawerClose = () => setOpen(false);

  const handleDeleteColor = (colorName) => () => {
    setColors([...filter(({ name }) => not(equals(name, colorName)), colors)]);
  };

  function addNewColor() {
    const newColor = {
      color: currColor,
      name: form.colorName,
    }
    setColors([...colors, newColor]);
  }

  function changeColor(newColor) {
    updateCurrColor(newColor.hex);
  };

  function handleChange(e) {
    const { name, value } = e.target;
    updateForm({ ...form, [name]: value });
  }

  function handleSubmit() {
    const newPalette = {
      id: replace(/ /g, '-', trim(toLower(form.paletteName))),
      paletteName: form.paletteName,
      colors
    };

    savePalette(newPalette);
    history.push('/');
  }

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
            Persistent drawer
          </Typography>
          <ValidatorForm onSubmit={handleSubmit}>
            <TextValidator
              name="paletteName"
              value={form.paletteName}
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
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <Typography variant="h4">Design Your Palette</Typography>
        <div>
          <Button variant="contained" color="secondary">Clear Palette</Button>
          <Button variant="contained" color="primary">Random Color</Button>
        </div>
        <ChromePicker color={currColor} onChangeComplete={changeColor} />
        <ValidatorForm onSubmit={addNewColor}>
          <TextValidator
            name="colorName"
            value={form.colorName}
            onChange={handleChange}
            validators={['required', 'isColorNameUnique', 'isColorUnique']}
            errorMessages={[
              'Enter a color name.',
              'Color name must be unique.',
              'Color already used.'
            ]}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ backgroundColor: currColor }}
          >
            Add Color
          </Button>
        </ValidatorForm>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        {map(({ color, name }) => (
          <DraggableColorBox
            key={color}
            backgroundColor={color}
            name={name}
            handleDelete={handleDeleteColor(name)}
          />
        ), colors)}
      </main>
    </div>
  );
}