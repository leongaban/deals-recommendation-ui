import React from 'react';

// React Sortable
import { SortableElement } from 'react-sortable-hoc';

// Material-UI
import Switch from '@material-ui/core/Switch';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import IconButton from '@material-ui/core/IconButton';

// Components
import TdDescription from 'components/Layout/Partials/tdDescription';

// Strings
import { PRODUCT_MODAL } from 'constants/modals';

const TableRow = SortableElement(({
  classes, changeType, changeEnable, deleteRule, setModal, style, rule
}) => (
  <tr key={rule.ruleID} style={style.tr}>
    <TdDescription style={style.td} rule={rule} />
    <td colSpan="3" className="w300" style={style.td}>
      <RadioGroup
        className={classes.group}
        aria-label="types"
        name="types"
        value={rule.checked}
        onChange={e => changeType(rule, e)}
      >
        <FormControlLabel value="Override" control={<Radio />} label="Override" />
        <FormControlLabel value="Default" control={<Radio />} label="Default" />
        <FormControlLabel value="Exclude" control={<Radio />} label="Exclude" />
      </RadioGroup>
    </td>
    <td style={style.td}>
      <span className="top-15">
        <Switch
          checked={rule.enabled}
          value={rule.ruleID}
          onChange={e => changeEnable(e)}
          color="primary"
        />
      </span>
    </td>
    <td style={style.td}>
      <span className="top-15">
        <IconButton
          className="pencil-ico"
          onClick={() => setModal(PRODUCT_MODAL, rule)}
        />
      </span>
    </td>
    <td style={style.td}>
      <span className="top-15">
        <IconButton
          className="trash-ico"
          onClick={() => deleteRule(rule)}
        />
      </span>
    </td>
  </tr>));

export default TableRow;
