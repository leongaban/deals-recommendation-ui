// Test utils
import { testCommonComponentAttrs } from 'utils/tests';

// Components
import SubmitButton from './submitButton';

const mockProps = {
  classes: {
    buttonRed: 'foobar'
  },
  isDisabled: true
};

describe('<SubmitButton /> component', () => {
  testCommonComponentAttrs(SubmitButton, mockProps);
});
