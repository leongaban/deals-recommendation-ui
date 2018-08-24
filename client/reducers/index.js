import authReducer, { initialState as authIntialState } from 'reducers/Auth';
import notificationsReducer, { initialState as notificationsIntialState } from 'reducers/Notifications';
import modalsReducer, { initialState as modalsInitialState } from 'reducers/Modals';
import rulesReducer, { initialState as rulesInitialState } from 'reducers/Rules';

export const initialStates = {
  authReducer: authIntialState,
  notificationsReducer: notificationsIntialState,
  modalsReducer: modalsInitialState,
  rulesReducer: rulesInitialState
};

const reducers = {
  authReducer,
  notificationsReducer,
  modalsReducer,
  rulesReducer
};

export default reducers;
