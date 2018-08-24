/* eslint-disable object-curly-newline */
import React, { Component } from 'react';
import { connect } from 'react-redux';

// Actions
import { getRules as fetchRules } from 'actions/Rules';

// Material-UI
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

// Utils
import { cleanMapStateToProps } from 'utils/redux';
import { isArrayEmpty } from 'utils/common';

// Components
import ProductsTabContainer from 'components/Layout/productsTabContainer';

// Constants
import { TABS_DEFINITIONS } from 'constants/tabs';

// Styles
import { styles } from './tableContainer.styles';

class TableContainer extends Component {
  constructor(props) {
    super(props);

    const {
      getRules,
      rulesAll
    } = props;

    this.state = { value: 0 };

    if (isArrayEmpty(rulesAll)) {
      getRules();
    }

    this.handleChangeTab = this.handleChangeTab.bind(this);
  }

  handleChangeTab(event, value) {
    this.setState({ value });
  }

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    const { tabRoot, tabsRoot, tabSelected, tabsIndicator } = classes;
    const tabsClasses = { root: tabsRoot, indicator: tabsIndicator };
    const tabClasses = { root: tabRoot, selected: tabSelected };

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs value={value} classes={tabsClasses} onChange={this.handleChangeTab}>
            {TABS_DEFINITIONS.map(({ label }) => (
              <Tab key={label} classes={tabClasses} label={label} />
            ))}
          </Tabs>
        </AppBar>
        <ProductsTabContainer value={value} {...this.props} />
      </div>
    );
  }
}

export const mapDispatchToProps = dispatch => ({
  getRules: (...args) => dispatch(fetchRules(...args))
});

const mapStateToProps = cleanMapStateToProps([
  'rulesAll',
  'rulesOverride',
  'rulesDefault',
  'rulesExcluded'
]);

export const TableContainerJest = TableContainer;

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(TableContainer));
