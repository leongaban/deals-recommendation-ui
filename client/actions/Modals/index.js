// Action Types
import {
  MODAL_CLOSE_MODAL,
  MODAL_SET_MODAL
} from 'actions/types';

/**
 * Sets a new modal (which in turn opens it) with the provided props.
 * New modals are added to the modal stack.
 * @param {string} modalName The name of the modal to set.
 * @param {!Object} modalProps The props to pass through the modal being set.
 */
export const setModal = (modalName, modalProps = {}) => dispatch => (
  dispatch({
    type: MODAL_SET_MODAL,
    payload: {
      modalName,
      modalProps
    }
  })
);

/**
 * Closes a modal (by removing it from the stack).
 * If "force" is set to true, the modal stack will be cleared/emptied.
 * @param {boolean} force Whether or not to clear the stack completely.
 */
export const closeModal = () => dispatch => (
  dispatch({
    type: MODAL_CLOSE_MODAL,
    payload: {
      modalName: ''
    }
  })
);
