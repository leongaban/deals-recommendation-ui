import React from 'react';

// Action Types
import { MODAL_CLOSE_MODAL } from 'actions/types';

// Material-UI
import Button from '@material-ui/core/Button';

export default ({ classes, closeModal }) => (
  <Button
    className={classes.buttonBlue}
    onClick={() => closeModal(MODAL_CLOSE_MODAL)}
  >
    Cancel
  </Button>);
