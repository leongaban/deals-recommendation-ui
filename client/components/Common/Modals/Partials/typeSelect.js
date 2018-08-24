import React from 'react';

// Material-UI
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

export default ({ classes, checked, handleChangeType }) => (
  <div className="product-type">
    <RadioGroup
      aria-label="types"
      name="types"
      className={classes.group}
      value={checked}
      onChange={handleChangeType}
    >
      <FormControlLabel value="Override" control={<Radio />} label="Override" />
      <FormControlLabel value="Default" control={<Radio />} label="Default" />
      <FormControlLabel value="Exclude" control={<Radio />} label="Exclude" />
    </RadioGroup>
  </div>);
