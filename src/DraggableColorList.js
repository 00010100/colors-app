import React from 'react';
import { SortableContainer } from 'react-sortable-hoc';

import DraggableColorBox from './DraggableColorBox';

const DraggableColorList = SortableContainer(({ colors, handleDeleteColor }) => (
  <div style={{height : '100%'}}>
    {colors.map((color, i) => (
      <DraggableColorBox
        index={i}
        key={color.name}
        backgroundColor={color.color}
        name={color.name}
        handleDelete={handleDeleteColor(color.name)}
      />
    ))}
  </div>
));

export default DraggableColorList;