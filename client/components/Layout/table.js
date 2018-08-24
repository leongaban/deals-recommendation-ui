/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
import React, { Component } from 'react';
import { connect } from 'react-redux';

// Actions
import { updateRules as putRules } from 'actions/Rules';
import { setModal as setModalAction } from 'actions/Modals';
import { toggleNotification as displayToggleNotification } from 'actions/Notifications';

// Components
import Thead from 'components/Layout/Partials/thead';
import TableRowsContainer from 'components/Layout/tableRowsContainer';
import TableRow from 'components/Layout/tableRow';

// Utils
import { cleanMapStateToProps } from 'utils/redux';
import {
  changeRuleType,
  changeEnabledStatus,
  changedRanks,
  checkLimits,
  findListType
} from 'utils/rules';

// Strings
import { DELETE_PRODUCT_MODAL } from 'constants/modals';

// Material-UI
import { withStyles } from '@material-ui/core/styles';

// Styles
import { styles } from './table.styles';

class Table extends Component {
  static getDerivedStateFromProps(nextProps) {
    const { list } = nextProps;
    const listType = findListType(list);
    return { list, listType };
  }

  constructor(props) {
    super(props);

    // List comes from props and is set to state.
    const { list } = props;

    this.state = {
      list,
      listType: ''
    };

    this.handleChangeType = this.handleChangeType.bind(this);
    this.handleToggleEnable = this.handleToggleEnable.bind(this);
    this.handleSortUpdate = this.handleSortUpdate.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleChangeType(product, event) {
    const {
      rulesSort,
      update,
      list,
      rulesDefault: dList,
      rulesOverride: oList
    } = this.props;

    const { listType } = this.state;
    const { ruleID, rank } = product;
    const { value: type } = event.target;

    const rulePackage = {
      listType, list, type, rank, rulesSort, ruleID, dList, oList
    };

    const newRules = changeRuleType(rulePackage);
    update(newRules);
  }

  handleToggleEnable(event) {
    const {
      rulesDefault,
      rulesOverride,
      rulesExcluded,
      rulesSort,
      update,
      list,
      toggleNotification
    } = this.props;

    const { value: ruleID } = event.target;
    const rule = list.filter(i => ruleID === i.ruleID).pop();
    const type = rule.checked.charAt(0);
    const canToggle = checkLimits(type, rulesDefault, rulesOverride, rulesExcluded);
    const { enabled } = rule;

    // If the list has room OR if we are disabling then update:
    if (canToggle || enabled) {
      const newRules = changeEnabledStatus(list, rulesSort, ruleID);
      update(newRules);
    } else {
      const errMsg = `You have hit the enabled ${rule.checked.toLowerCase()} limit.`;
      toggleNotification(errMsg, 'error');
    }
  }

  /**
   * Updates the sort order for an entity group.
   * @param {{ oldIndex: number, newIndex: number }}
   */
  handleSortUpdate({ oldIndex, newIndex }) {
    const { update, rulesSort } = this.props;
    const { listType } = this.state;

    const list = [
      ...this.state.list
    ];

    const [item] = list.splice(oldIndex, 1);
    list.splice(newIndex, 0, item);

    const rerankedList = list.map((rule, index) => {
      rule.rank = index + 1;
      return rule;
    });

    const newRules = changedRanks(listType, rerankedList, rulesSort);

    update(newRules);

    this.setState({
      ...this.state, list
    });
  }

  handleDelete({ description, ruleID }) {
    const { setModal } = this.props;
    setModal(DELETE_PRODUCT_MODAL, { description, ruleID });
  }

  renderList() {
    const { classes, setModal } = this.props;
    const { list } = this.state;

    return list.map((rule, index) => (
      <TableRow
        key={rule.ruleID}
        index={index}
        classes={classes}
        changeType={this.handleChangeType}
        changeEnable={this.handleToggleEnable}
        deleteRule={this.handleDelete}
        setModal={setModal}
        style={styles}
        rule={rule}
      />
    ));
  }

  render() {
    return (
      <table>
        <Thead />
        <TableRowsContainer onSortEnd={this.handleSortUpdate}>
          { this.renderList() }
        </TableRowsContainer>
      </table>
    );
  }
}

export const mapDispatchToProps = dispatch => ({
  update: (...args) => dispatch(putRules(...args)),
  setModal: (...args) => dispatch(setModalAction(...args)),
  toggleNotification: (...args) => dispatch(displayToggleNotification(...args))
});

const mapStateToProps = cleanMapStateToProps([
  'rulesDefault',
  'rulesOverride',
  'rulesExcluded',
  'rulesSort'
]);

export const TableJest = Table;

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Table));
