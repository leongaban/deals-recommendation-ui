import React, { Component } from 'react';
import { connect } from 'react-redux';

// Actions
import { updateSortRule as putSortRule } from 'actions/Rules';

// Utils
import { cleanMapStateToProps } from 'utils/redux';

// Constants
import {
  LIFT,
  WEIGHTEDLIFT,
  WEIGHTED_LIFT
} from 'copy/Components/tableHeader';

// Material-UI
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

// Styles
import { styles } from './tableHeader.styles';

class TableHeader extends Component {
  static getDerivedStateFromProps(nextProps) {
    const { rulesSort } = nextProps;
    return { rulesSort };
  }

  constructor(props) {
    super(props);

    this.state = {
      rulesSort: 'Lift'
    };

    this.handleSortChange = this.handleSortChange.bind(this);
  }

  handleSortChange(event) {
    const { updateSortRule } = this.props;
    const { value: sortRule } = event.target;
    updateSortRule({ sortRule });
  }

  render() {
    const {
      classes, rulesDefault, rulesOverride, rulesExcluded
    } = this.props;
    const { rulesSort } = this.state;

    const defaultEnabled = rulesDefault.filter(i => i.enabled === true);
    const overrideEnabled = rulesOverride.filter(i => i.enabled === true);
    const excludedLen = rulesExcluded.length;

    return (
      <header className="table-header">
        <h2 className={classes.blackColor}>Sort Rules</h2>

        <div className="sort-options">
          <RadioGroup
            aria-label="lift"
            name="lift"
            className={classes.group}
            value={rulesSort}
            onChange={e => this.handleSortChange(e)}
          >
            <FormControlLabel value={LIFT} control={<Radio />} label={LIFT} />
            <FormControlLabel value={WEIGHTEDLIFT} control={<Radio />} label={WEIGHTED_LIFT} />
          </RadioGroup>
        </div>

        <section className="limits">
          <ul>
            <li>Enabled limits:</li>
            <li>Overrides ({overrideEnabled.length}/4)</li>
            <li>Defaults ({defaultEnabled.length}/8)</li>
            <li>Excluded ({excludedLen}/8)</li>
          </ul>
        </section>
      </header>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  updateSortRule: (...args) => dispatch(putSortRule(...args))
});

const mapStateToProps = cleanMapStateToProps([
  'rulesDefault',
  'rulesOverride',
  'rulesExcluded',
  'rulesSort'
]);

export const TableHeaderJest = TableHeader;

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(TableHeader));
