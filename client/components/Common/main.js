import React from 'react';
import { connect } from 'react-redux';

// MUI
import { withStyles } from '@material-ui/core/styles';

// Components
import TopNav from 'components/Common/topNav';
import ProductModal from 'components/Common/Modals/productModal';
import DeleteModal from 'components/Common/Modals/deleteModal';

// Utils
import { cleanMapStateToProps } from 'utils/redux';

// Strings
import {
  PRODUCT_MODAL,
  DELETE_PRODUCT_MODAL
} from 'constants/modals';

import {
  findNotification,
  showNotification
} from 'utils/notifications';

const styles = {
  root: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    height: '100%'
  }
};

const renderModal = (modalName, modalProps) => {
  switch (modalName) {
    case PRODUCT_MODAL:
      return <ProductModal {...modalProps} />;
    case DELETE_PRODUCT_MODAL:
      return <DeleteModal {...modalProps} />;
    default:
      return null;
  }
};

const Main = (props) => {
  const {
    classes,
    children,
    notifications,
    modalName,
    modalProps,
    currentNotification
  } = props;

  const notificationObj = findNotification(currentNotification, notifications);

  return (
    <div className={classes.root}>
      { renderModal(modalName, modalProps) }
      <TopNav />
      { showNotification(notificationObj)}
      {children}
    </div>
  );
};

export const MainJest = Main;

export default connect(cleanMapStateToProps([
  'modalName',
  'modalProps'
]), null)(withStyles(styles)(Main));
