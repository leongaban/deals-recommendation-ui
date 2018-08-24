import React, { Component } from 'react';
import { connect } from 'react-redux';

// Action Types
import { MODAL_CLOSE_MODAL } from 'actions/types';

// Actions
import { closeModal as closeModalAction } from 'actions/Modals';
import {
  deleteRule as removeRule,
  updateRules as putRules
} from 'actions/Rules';

import { toggleNotification as displayToggleNotification } from 'actions/Notifications';

// Utils
import { cleanMapStateToProps } from 'utils/redux';
import { getArrayType, updateRanks, pluckRules } from 'utils/rules';

// Components
import CancelButton from 'components/Common/Modals/Partials/cancelButton';
import DeleteButton from 'components/Common/Modals/Partials/deleteButton';

// Material-UI
import { withStyles } from '@material-ui/core/styles';

// Styles
import { styles } from 'components/Common/Modals/productModal';

class DeleteModal extends Component {
  constructor(props) {
    super(props);

    this.handleDelete = this.handleDelete.bind(this);
    this.getUpdatedRulesArray = this.getUpdatedRulesArray.bind(this);
  }

  // Make this a class method, and write a test.
  getUpdatedRulesArray() {
    const {
      rulesAll, rulesOverride, rulesDefault, ruleID
    } = this.props;

    const rule = rulesAll.find(r => r.ruleID === ruleID);
    const { type, rank } = rule;
    const pluckedRules = pluckRules(type, rulesOverride, rulesDefault);
    const filteredList = pluckedRules.filter(i => i.ruleID !== ruleID);

    return {
      list: updateRanks(rank, filteredList),
      type
    };
  }

  handleDelete() {
    const {
      closeModal,
      deleteRule,
      description,
      ruleID,
      toggleNotification,
      updateRules
    } = this.props;

    closeModal(MODAL_CLOSE_MODAL);

    deleteRule(ruleID).then(() => {
      const updatedRules = this.getUpdatedRulesArray();
      const { list, type } = updatedRules;
      const arrayType = getArrayType(type);
      const successMsg = `You deleted rule for ${description}.`;

      if (arrayType && list) {
        updateRules({ [arrayType]: list });
      }

      toggleNotification(successMsg, 'success');
    });
  }

  render() {
    const { classes = {}, closeModal, description } = this.props;

    return (
      <div className="product-modal-container">
        <section className="product-modal delete-modal">
          <h1>Delete Product Confirmation</h1>
          <strong>{description}</strong>
          <div className="x-btn" onClick={() => closeModal(MODAL_CLOSE_MODAL)} />

          <div className="button-group">
            <DeleteButton classes={classes} handleDelete={this.handleDelete} />
            <CancelButton classes={classes} closeModal={closeModal} />
          </div>
        </section>
        <div className="overlay" onClick={() => closeModal(MODAL_CLOSE_MODAL)} />
      </div>
    );
  }
}

const mapStateToProps = cleanMapStateToProps([
  'rulesAll',
  'rulesOverride',
  'rulesDefault'
]);

export const mapDispatchToProps = dispatch => ({
  closeModal: (...args) => dispatch(closeModalAction(...args)),
  deleteRule: (...args) => dispatch(removeRule(...args)),
  updateRules: (...args) => dispatch(putRules(...args)),
  toggleNotification: (...args) => dispatch(displayToggleNotification(...args))
});

export const DeleteModalJest = DeleteModal;

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(DeleteModal));
