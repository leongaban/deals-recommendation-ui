import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

// Action Types
import {
  NOTIFICATION_ADD,
  AUTH_LOGIN_PENDING,
  AUTH_LOGGED_IN
} from 'actions/types';

// Test actions.
import {
  // onAuthStateChange,
  resetPassword,
  login
  // logout
} from './index';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

// Mock test assertions.
const mockAction = 'NOTIFICATION_ADD';
const mockRouterPush = { type: 'MOCK_ROUTER_PUSH' };

// Mock the services.
jest.mock('services/firebase', () => Promise.resolve({
  sendPasswordResetEmail: jest.fn(),
  signInWithEmailAndPassword: jest.fn(),
  logout: jest.fn(),
  dispatchLogout: jest.fn()
}));

// Mock utils.
jest.mock('utils/auth', () => ({
  validateEmail: () => true
}));

jest.mock('actions', () => ({
  toggleNotification: () => ({ type: mockAction })
}));

jest.mock('react-router-redux', () => ({
  push: () => (mockRouterPush)
}));

let store;

const flattenActionTypes = actions => actions.map(action => action.type);

describe('Login Actions', () => {
  beforeEach(() => {
    store = mockStore({});
  });

  describe('actions', () => {
    it('should reset the password', () => store.dispatch(resetPassword('foo.bar'))
      .then(() => {
        const flattened = flattenActionTypes(store.getActions());
        expect(flattened).toEqual([NOTIFICATION_ADD]);
      }));

    it('should sign a user in', () => store.dispatch(login('foo', 'bar'))
      .then(() => {
        const flattened = flattenActionTypes(store.getActions());

        expect(flattened).toEqual([
          AUTH_LOGIN_PENDING,
          AUTH_LOGGED_IN,
          mockRouterPush.type
        ]);
      }));

    // @TODO this needs to be fixed later.
    // it('should sign a user out', () => store.dispatch(logout())
    //   .then(() => {
    //     const flattened = flattenActionTypes(store.getActions());
    //     console.log('flattened', flattened);
    //     expect(flattened).toEqual([NOTIFICATION_ADD]);
    //   }));

    // @TODO this needs to be fixed later.
    // it('should handle auth state changes', () => store.dispatch(onAuthStateChange())
    //   .then(() => {
    //     const flattened = flattenActionTypes(store.getActions());
    //     expect(flattened.length).toBe(0);
    //   }));
  });
});
