import React, { useState, useEffect } from 'react';
import { find, propEq, reject, equals } from 'ramda';
import { Route, Switch } from 'react-router-dom';

import { generatePalette } from './colorHelpers';
import Palette from './Palette';
import PaletteList from './PaletteList';
import NewPaletteForm from './NewPaletteForm';
import SingleColorPalette from './SingleColorPalette';
import seedColors from './seedColors';

export default function App() {
  const savedPalettes = JSON.parse(window.localStorage.getItem('palettes'));
  const [palettes, setPalettes] = useState(savedPalettes || seedColors);

  useEffect(() => {
    window.localStorage.setItem('palettes', JSON.stringify(palettes));
  }, [palettes]);

  const findPalette = (id) => find(propEq('id', id))(palettes);
  const savePalette = (newPalette) => setPalettes([...palettes, newPalette]);
  const deletePalette = (id) => setPalettes((pal) => reject((p) => equals(p.id, id), pal));

  return (
    <Switch>
      <Route
        exact
        path="/"
        render={routeProps => (
          <PaletteList
            palettes={palettes}
            deletePalette={deletePalette}
            {...routeProps} 
          />
        )}
      />
      <Route
        exact
        path="/palette/new"
        render={routeProps => (
          <NewPaletteForm savePalette={savePalette} palettes={palettes} {...routeProps} />
        )}
      />
       <Route
        exact
        path="/palette/:id"
        render={routeProps => (
          <Palette
            showingFullPalette
            palette={generatePalette(findPalette(routeProps.match.params.id))}
          />
        )}
      />
      <Route
        exact
        path="/palette/:paletteId/:colorId"
        render={routeProps => (
          <SingleColorPalette
            showingFullPalette={false}
            colorId={routeProps.match.params.colorId}
            palette={generatePalette(findPalette(routeProps.match.params.paletteId))}
          />
        )}
      />
    </Switch>
  );
}