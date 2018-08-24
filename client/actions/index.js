// Global Actions
export {
  changeRoute,
  saveRedirect
} from './Global/';

// Login Actions
export {
  authorize,
  dispatchLogout,
  authenticate,
  onAuthStateChange,
  logout,
  login,
  resetPassword
} from './Auth/';

// Modals Actions
export {
  setModal,
  closeModal
} from './Modals/';

// Notifications Actions
export {
  displayError,
  toggleNotification
} from './Notifications/';
