import React from 'react';

// Material-UI
import Button from '@material-ui/core/Button';

// Copy
import { ADD_PRODUCT, SAVE } from 'copy/Components/modals';

export default ({ classes, isDisabled, edit }) => (
  <Button
    type="submit"
    variant="outlined"
    color="primary"
    className={classes.buttonRed}
    disabled={isDisabled}
  >
    { edit ? SAVE : ADD_PRODUCT }
  </Button>);
