// Test utils
import { testCommonComponentAttrs } from 'utils/tests';

// Components
import TypeSelect from './submitButton';

const mockChange = jest.fn();

const mockProps = {
  classes: {
    group: 'foobar'
  },
  checked: true,
  handleChangeType: mockChange
};

describe('<TypeSelect /> component', () => {
  testCommonComponentAttrs(TypeSelect, mockProps);
});
