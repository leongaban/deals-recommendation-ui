// Test utils
import { testCommonComponentAttrs, testDispatchToProps } from 'utils/tests';

// Jests.
import { LoginJest, mapDispatchToProps } from './login';

const mockProps = {
  classes: {
    wrapper: 'warpper',
    loginButton: 'loginButton',
    loginForm: 'loginForm',
    inputLeft: 'inputLeft',
    copy: 'copy'
  }
};

describe('<RouteInterceptor /> component', () => {
  testCommonComponentAttrs(LoginJest, mockProps);
  testDispatchToProps(LoginJest, mapDispatchToProps);
});
