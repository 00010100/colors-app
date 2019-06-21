import React from 'react';
import { Route, Switch } from 'react-router-dom';

// import { generatePalette } from './colorHelpers';
// import Palette from './Palette';
// import seedColors from './seedColors';

function App() {
  return (
    <Switch>
      <Route exact path="/" render={() => <div>Palette List</div>} />
      <Route exact path="/palette/:id" render={() => <div>Individual Palette</div>} />
    </Switch>
    // <div>
    //   <Palette palette={generatePalette(seedColors[4])} />
    // </div>
  );
}

export default App;
