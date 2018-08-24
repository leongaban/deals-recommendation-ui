/**
 * Rights that are valid for access to this application.
 * @const {!Array.<string>}
 */
const VALID_RIGHTS = ['admin', 'viewer'];

/**
 * Determines if the user has the proper rights to access the application.
 * @param {!Array.<!Object>} services The services to check for authorization.
 * @return {boolean}
 */
export const hasRights = (services = []) => {
  if (!services) return false;

  const siskelRights = services.find(svc => svc.name.toLowerCase() === 'siskel' && !svc.disabled);

  // Abort if the user doesn't have anmy Mythor rights.
  if (!siskelRights || siskelRights.disabed) return false;

  // Determine if the user has valid rights (and that those rights are enabled).
  const { rights = [] } = siskelRights;
  return rights.some(({ disabled, name }) =>
    !disabled && VALID_RIGHTS.indexOf(name.toLowerCase()) !== -1);
};

/**
 * Validates whether or not the email meets prerequisites.
 * @param {string} email The value of the email.
 * @return {bool} Whether or not the email is valid.
 */
export const validateEmail = email => email.match(/\w{1,}\.?\w{0,}@(yum|pizzahut)\.com/g);

/**
 * Validates whether or not the password meets prerequisites.
 * @param {string} pass The value of the password.
 * @return {bool} Whether or not the password is valid.
 * @NOTE: Only prerequisite is password length must be >= 6 characters
 */
export const validatePassword = pass => pass.length >= 6;

/**
 * Validates whether or not the the new passwords match
 * @param {string} newPass The value of the password.
 * @param {string} newConfirmPass The value of the second password (confirm password).
 * @return {bool} Whether or not the given passwords are valid and are identical.
 * @NOTE: Only prerequisite is password length must be >= 6 characters and
 ** the new passwords are identical
 */
export const validateChangePassword = (newPass, newConfirmPass) =>
  newPass === newConfirmPass && newConfirmPass.length >= 6;
