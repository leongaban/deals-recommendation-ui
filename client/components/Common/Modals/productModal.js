import React, { Component } from 'react';
import { connect } from 'react-redux';

// Action Types
import { MODAL_CLOSE_MODAL } from 'actions/types';

// Actions
import { closeModal as closeModalAction } from 'actions/Modals';
import { updateRules as putRules } from 'actions/Rules';
import { toggleNotification as displayToggleNotification } from 'actions/Notifications';

// Components
import TypeSelect from 'components/Common/Modals/Partials/typeSelect';
import CancelButton from 'components/Common/Modals/Partials/cancelButton';
import SubmitButton from 'components/Common/Modals/Partials/submitButton';
import ProductInput from 'components/Common/Modals/Partials/productInput';

// Utils
import { cleanMapStateToProps } from 'utils/redux';
import { checkLimits, checkSubmitable, setRank, validProductForm } from 'utils/rules';
import { isEmptyString, isUndefined } from 'utils/common';
import { modalName, enabledValue, setChecked } from 'utils/modals';

// Material-UI
import Switch from '@material-ui/core/Switch';
import { withStyles } from '@material-ui/core/styles';

// Styles
import { styles } from 'components/Common/Modals/productModal';

class ProductModal extends Component {
  constructor(props) {
    super(props);

    // Make a local copy of values for live edits.
    const {
      description = '',
      base = '',
      class: classId = '',
      prod = '',
      size = '',
      enabled = '',
      type
    } = props;

    this.state = {
      description,
      base,
      classId,
      prod,
      size,
      enabled,
      checked: setChecked(type)
    };

    this.handleChangeType = this.handleChangeType.bind(this);
    this.handleChangeInput = this.handleChangeInput.bind(this);
    this.handleToggleEnable = this.handleToggleEnable.bind(this);
    this.toUpper = this.toUpper.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeType(event) {
    this.setState({ checked: event.target.value });
  }

  handleChangeInput(event) {
    const { id, value } = event.target;

    this.setState({
      [id]: value
    });
  }

  handleToggleEnable(e, enabled) {
    this.setState({
      enabled
    });
  }

  toUpper(key) {
    const value = this.state[key];
    return value.toUpperCase();
  }

  handleSubmit(e) {
    e.preventDefault();

    const {
      rulesSort: sortRule,
      update,
      closeModal,
      toggleNotification,
      rulesDefault,
      rulesOverride,
      rulesExcluded,
      ruleID
    } = this.props;

    const { checked, description, enabled } = this.state;
    const type = checked.charAt(0);
    const { toUpper } = this;
    const sortableArrays = {
      d: rulesDefault,
      o: rulesOverride
    };

    const rank = setRank(type, sortableArrays);
    const enabledBool = !isEmptyString(enabled);
    const listNotFull = checkLimits(type, rulesDefault, rulesOverride, rulesExcluded);
    const canSubmit = checkSubmitable(listNotFull, enabled);

    if (canSubmit) {
      const newRules = {
        [checked.toLowerCase()]: [{
          type,
          rank,
          ruleID,
          checked,
          description,
          base: toUpper('base'),
          class: toUpper('classId'),
          prod: toUpper('prod'),
          size: toUpper('size'),
          enabled: enabledBool
        }],
        sortRule
      };

      const successMsg = `You created a new rule called ${description}.`;

      update(newRules).then(() => {
        closeModal(MODAL_CLOSE_MODAL);
        toggleNotification(successMsg, 'success');
      });
    } else {
      const errMsg = `You have hit the enabled ${checked.toLowerCase()} limit.`;
      toggleNotification(errMsg, 'error');
    }
  }

  render() {
    const {
      classes = {}, closeModal, ruleID, rulesDefault, rulesOverride, rulesExcluded
    } = this.props;

    const {
      checked, description: desc, base, classId, prod, size, enabled
    } = this.state;

    const defaultEnabled = rulesDefault.filter(i => i.enabled === true);
    const overrideEnabled = rulesOverride.filter(i => i.enabled === true);
    const excludedLen = rulesExcluded.length;
    const validFrom = validProductForm(this.state);
    const isEdit = !isUndefined(ruleID);
    let btnDisable = !validFrom;

    if (isEdit) btnDisable = false;

    return (
      <div className="product-modal-container">
        <form onSubmit={this.handleSubmit}>
          <section className="product-modal">
            <h1>{modalName(isEdit)} Product</h1>
            <section className="modal-limits">
              <ul>
                <li>Enabled limits:</li>
                <li>Overrides ({overrideEnabled.length}/4)</li>
                <li>Defaults ({defaultEnabled.length}/8)</li>
                <li>Excluded ({excludedLen}/8)</li>
              </ul>
            </section>
            <div className="x-btn" onClick={() => closeModal(MODAL_CLOSE_MODAL)} />

            <ProductInput id="description" val={desc} handler={this.handleChangeInput} edit={isEdit} />

            <div className="product-keys">
              <ProductInput id="base" val={base} handler={this.handleChangeInput} />
              <ProductInput id="classId" val={classId} handler={this.handleChangeInput} />
              <ProductInput id="prod" val={prod} handler={this.handleChangeInput} />
              <ProductInput id="size" val={size} handler={this.handleChangeInput} />
            </div>

            <TypeSelect
              classes={classes}
              checked={checked}
              handleChangeType={this.handleChangeType}
            />

            <div className="product-enable">
              <Switch
                checked={enabled}
                value={enabledValue(enabled)}
                onChange={this.handleToggleEnable}
                color="primary"
              />
              Enabled (Red) / Disabled (Gray)
            </div>

            <div className="button-group">
              <SubmitButton classes={classes} isDisabled={btnDisable} edit={isEdit} />
              <CancelButton classes={classes} closeModal={closeModal} />
            </div>

            <p><span className="red">*</span> denotes required fields.</p>
          </section>
          <div className="overlay" onClick={() => closeModal(MODAL_CLOSE_MODAL)} />
        </form>
      </div>
    );
  }
}

export const mapDispatchToProps = dispatch => ({
  closeModal: (...args) => dispatch(closeModalAction(...args)),
  update: (...args) => dispatch(putRules(...args)),
  toggleNotification: (...args) => dispatch(displayToggleNotification(...args))
});

const mapStateToProps = cleanMapStateToProps([
  'rulesDefault',
  'rulesOverride',
  'rulesExcluded',
  'rulesSort'
]);

export const ProductModalJest = ProductModal;

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ProductModal));
