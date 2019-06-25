import React, { useState, useEffect } from 'react';
import { all, not, equals, toLower } from 'ramda';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';

export default function PaletteMetaForm({ palettes, handleSubmit, onCloseForm }) {
  const [paletteName, updatePaletteName] = useState('');
  const [stage, updateStage] = useState('form');
  const [emoji, setEmoji] = useState('');

  useEffect(() => {
    ValidatorForm.addValidationRule('isPaletteNameUnique', (value) => (
      all(({ paletteName }) => not(equals(toLower(paletteName), toLower(value))), palettes)
    ));
  }, [palettes]);

  const handleChange = (e) => updatePaletteName(e.target.value);

  const showEmojiPicker = () => updateStage('emoji');

  const toBack = () => updateStage('form');

  const savePalette = () => handleSubmit({ paletteName, emoji });

  const selectEmoji = (emoji) => setEmoji(emoji.native);

  return (
    <>
      <Dialog open={stage === 'emoji'} onClose={onCloseForm}>
        <DialogTitle id="form-dialog-title">Pick a Palette emoji</DialogTitle>
        <Picker onSelect={selectEmoji} />
        <DialogActions>
          <Button onClick={toBack} color="primary">
            Back
          </Button>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            onClick={savePalette}
          >
            Save Palette
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={stage === 'form'} onClose={onCloseForm} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Choose a Palette Name</DialogTitle>
        <ValidatorForm onSubmit={showEmojiPicker}>
          <DialogContent>
            <DialogContentText>
              Please enter a name for your new beautiful palette. Make sure it's unique!
            </DialogContentText>
              <TextValidator
                value={paletteName}
                onChange={handleChange}
                margin="normal"
                fullWidth
                placeholder="Enter palette name"
                validators={['required', 'isPaletteNameUnique']}
                errorMessages={[
                  'Enter palette name.',
                  'Palette name already used.'
                ]}
              />
          </DialogContent>
          <DialogActions>
            <Button onClick={onCloseForm} color="primary">
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              type="submit"
            >
              Next
            </Button>
          </DialogActions>
        </ValidatorForm>
      </Dialog>
    </>
  );
}
