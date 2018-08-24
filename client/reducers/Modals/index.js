import {
  MODAL_CLOSE_MODAL,
  MODAL_SET_MODAL
} from 'actions/types';

export const initialState = {
  modalName: '',
  modalProps: {}
};

const modalsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case MODAL_SET_MODAL:
      return {
        ...state,
        modalName: payload.modalName,
        modalProps: payload.modalProps
      };
    case MODAL_CLOSE_MODAL:
      return {
        ...state,
        modalName: '',
        modalProps: {}
      };
    default:
      return state;
  }
};

export default modalsReducer;
