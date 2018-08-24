import React from 'react';

// Material-UI
import Button from '@material-ui/core/Button';

export default ({ classes, handleDelete }) => (
  <Button
    type="submit"
    variant="outlined"
    color="primary"
    className={classes.buttonRed}
    onClick={handleDelete}
  >
    Delete Product
  </Button>);
