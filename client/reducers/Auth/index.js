import {
  AUTH_LOGGED_IN,
  AUTH_LOGGED_OUT,
  AUTH_LOGIN_PENDING
} from 'actions/types';

export const initialState = {
  authed: null,
  userId: null,
  userEmail: null,
  userFirstName: null,
  userLastName: null,
  userServices: null
};

const parseUserProps = (state, action, authed) => {
  const user = action.payload;
  if (user) {
    const userKeys = Object.keys(user).reduce((newState, cVal) => {
      const key = cVal === 'UserID' ? 'Id' : cVal;
      const stateKey = `user${key[0].toUpperCase()}${key.slice(1)}`;
      return ({
        ...newState,
        [stateKey]: user[cVal]
      });
    }, {
      ...state,
      authed
    });
    return userKeys;
  }

  return {
    ...state,
    authed
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_LOGIN_PENDING:
      return {
        authed: false
      };
    case AUTH_LOGGED_IN:
      return parseUserProps(state, action, true);
    case AUTH_LOGGED_OUT:
      return Object.keys(state).reduce((newState, key) => {
        if (key.indexOf('user') > -1) {
          return {
            ...newState,
            [key]: null
          };
        }

        // If user is logged out, we set authed to false to indicate a redirect
        // should happen.
        if (key === 'authed') {
          return {
            ...newState,
            authed: false
          };
        }

        return {
          ...newState,
          [key]: state[key]
        };
      }, {});
    default:
      return state;
  }
};

export default reducer;
