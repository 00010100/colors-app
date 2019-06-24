import React, { useState } from 'react';
import { find, propEq } from 'ramda';
import { Route, Switch } from 'react-router-dom';

import { generatePalette } from './colorHelpers';
import Palette from './Palette';
import PaletteList from './PaletteList';
import NewPaletteForm from './NewPaletteForm';
import SingleColorPalette from './SingleColorPalette';
import seedColors from './seedColors';

export default function App() {
  const [palettes, setPalettes] = useState(seedColors); 

  const findPalette = (id) => find(propEq('id', id))(palettes);
  const savePalette = (newPalette) => setPalettes([...palettes, newPalette]);

  return (
    <Switch>
      <Route
        exact
        path="/"
        render={routeProps => <PaletteList palettes={palettes} {...routeProps} />}
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
            palette={generatePalette(findPalette(routeProps.match.params.id))}
          />
        )}
      />
      <Route
        exact
        path="/palette/:paletteId/:colorId"
        render={routeProps => (
          <SingleColorPalette
            colorId={routeProps.match.params.colorId}
            palette={generatePalette(findPalette(routeProps.match.params.paletteId))}
          />
        )}
      />
    </Switch>
  );
}