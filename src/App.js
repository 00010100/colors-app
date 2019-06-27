import React, { useState, useEffect } from 'react';
import { find, propEq, reject, equals } from 'ramda';
import { Route, Switch } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { generatePalette } from './colorHelpers';
import Palette from './Palette';
import PaletteList from './PaletteList';
import NewPaletteForm from './NewPaletteForm';
import SingleColorPalette from './SingleColorPalette';
import Page from './Page';
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
    <Route render={({ location }) => (
      <TransitionGroup>
        <CSSTransition key={location.key} classNames="page" timeout={500}>
          <Switch location={location}>
            <Route
              exact
              path="/"
              render={routeProps => (
                <Page>
                  <PaletteList
                    palettes={palettes}
                    deletePalette={deletePalette}
                    {...routeProps} 
                  />
                </Page>
              )}
            />
            <Route
              exact
              path="/palette/new"
              render={routeProps => (
                <Page>
                  <NewPaletteForm savePalette={savePalette} palettes={palettes} {...routeProps} />
                </Page>
              )}
            />
            <Route
              exact
              path="/palette/:id"
              render={routeProps => (
                <Page>
                  <Palette
                    showingFullPalette
                    palette={generatePalette(findPalette(routeProps.match.params.id))}
                  />
                </Page>
              )}
            />
            <Route
              exact
              path="/palette/:paletteId/:colorId"
              render={routeProps => (
                <Page>
                  <SingleColorPalette
                    showingFullPalette={false}
                    colorId={routeProps.match.params.colorId}
                    palette={generatePalette(findPalette(routeProps.match.params.paletteId))}
                  />
                </Page>
              )}
            />
            <Route
              render={routeProps => (
                <Page>
                  <PaletteList
                    palettes={palettes}
                    deletePalette={deletePalette}
                    {...routeProps} 
                  />
                </Page>
              )}
            />
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    )}/>
  );
}