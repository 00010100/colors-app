import React, { useState, useEffect } from 'react';
import {
  toLower,
  all,
  equals,
  not,
} from 'ramda';
import { Button } from '@material-ui/core';
import { ChromePicker } from 'react-color';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

export default function ColorPickerForm({
  paletteIsFull, addNewColor, colors
}) {
  const [currColor, updateCurrColor] = useState('teal');
  const [colorName, updateColorName] = useState('');

  useEffect(() => {
    ValidatorForm.addValidationRule('isColorNameUnique', (value) => (
      all(({ name }) => not(equals(toLower(name), toLower(value))), colors)
    ));
    ValidatorForm.addValidationRule('isColorUnique', () => (
      all(({ color }) => not(equals(color, currColor)), colors)
    ));
  }, [colors, currColor])

  
  function changeColor(newColor) {
    updateCurrColor(newColor.hex);
  };

  const handleChange = (e) => updateColorName(e.target.value);

  const handleSubmit = () => {
    const newColor = {
      color: currColor,
      name: colorName,
    }

    addNewColor(newColor);
    updateColorName('');
  }

  return (
    <div>
      <ChromePicker color={currColor} onChangeComplete={changeColor} />
        <ValidatorForm onSubmit={handleSubmit}>
          <TextValidator
            value={colorName}
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
            style={{ backgroundColor: paletteIsFull ? 'rgba(0, 0, 0, 0.12)' : currColor }}
            disabled={paletteIsFull}
          >
            {paletteIsFull ? 'Palette Full' : 'Add Color'}
          </Button>
        </ValidatorForm>
    </div>
  )
}