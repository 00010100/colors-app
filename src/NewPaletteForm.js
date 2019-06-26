import React, { useState } from 'react';
import {
  filter,
  toLower,
  equals,
  not,
  replace,
  trim,
  head,
  flatten,
  map,
  pipe
} from 'ramda';
import arrayMove from 'array-move';
import clsx from 'clsx';
import {
  Drawer,
  Typography,
  Divider,
  IconButton,
  Button,
} from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import DraggableColorList from './DraggableColorList';
import PaletteFormNav from './PaletteFormNav';
import ColorPickerForm from './ColorPickerForm';

import useStyles from './styles/NewPaletteFormStyles';

const maxColors = 20;

export default function NewPaletteForm({ savePalette, palettes, history }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [colors, setColors] = useState(head(palettes).colors);

  const handleDrawerOpen = () => setOpen(true);

  const handleDrawerClose = () => setOpen(false);

  const handleDeleteColor = (colorName) => () => {
    setColors([...filter(({ name }) => not(equals(name, colorName)), colors)]);
  };

  const addNewColor = (newColor) => setColors([...colors, newColor]);

  const handleSubmit = (palette) => {
    const newPalette = {
      ...palette,
      id: replace(/ /g, '-', trim(toLower(palette.paletteName))),
      colors,
    }

    savePalette(newPalette);
    history.push('/');
  }

  function onSortEnd({ oldIndex, newIndex }) {
    setColors([...arrayMove(colors, oldIndex, newIndex)]);
  }

  const clearPalette = () => setColors([]);
  
  const addRandomColor = () => {
    const allColors = pipe(
      map((p) => p.colors),
      flatten
    )(palettes);

    const randomIndex = Math.floor(Math.random() * allColors.length);

    const randomColor = allColors[randomIndex];

    setColors([...colors, randomColor]);
  }

  const paletteIsFull = colors.length >= maxColors;

  return (
    <div className={classes.root}>
      <PaletteFormNav
        open={open}
        palettes={palettes}
        handleSubmit={handleSubmit}
        handleDrawerOpen={handleDrawerOpen}
      />
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
        <div className={classes.container}>
          <Typography variant="h4" gutterBottom>Design Your Palette</Typography>
          <div className={classes.buttons}>
            <Button
              variant="contained"
              color="secondary"
              onClick={clearPalette}
              className={classes.button}
            >
              Clear Palette
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={addRandomColor}
              disabled={paletteIsFull}
              className={classes.button}
            >
              Random Color
            </Button>
          </div>
          <ColorPickerForm
            paletteIsFull={paletteIsFull}
            addNewColor={addNewColor}
            colors={colors}
          />
        </div>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        <DraggableColorList
          colors={colors}
          handleDeleteColor={handleDeleteColor}
          axis="xy"
          onSortEnd={onSortEnd}
        />
      </main>
    </div>
  );
}