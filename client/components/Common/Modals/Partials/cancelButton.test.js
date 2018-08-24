// Test utils
import { testCommonComponentAttrs } from 'utils/tests';

// Components
import CancelButton from './cancelButton';

const mockProps = {
  classes: {
    buttonBlue: 'foobar'
  },
  closeModal: jest.fn()
};

describe('<CancelButton /> component', () => {
  testCommonComponentAttrs(CancelButton, mockProps);
});
