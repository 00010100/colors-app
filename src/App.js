import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { generatePalette } from './colorHelpers';
import Palette from './Palette';
import PaletteList from './PaletteList';
import NewPaletteForm from './NewPaletteForm';
import SingleColorPalette from './SingleColorPalette';
import seedColors from './seedColors';

function App() {
  const findPalette = (id) => seedColors.find((palette) => palette.id === id);

  return (
    <Switch>
      <Route
        exact
        path="/"
        render={routeProps => <PaletteList palettes={seedColors} {...routeProps} />}
      />
      <Route
        exact
        path="/palette/new"
        render={() => <NewPaletteForm />}
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

export default App;
