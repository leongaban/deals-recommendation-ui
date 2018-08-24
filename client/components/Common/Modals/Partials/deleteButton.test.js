// Test utils
import { testCommonComponentAttrs } from 'utils/tests';

// Components
import DeleteButton from './deleteButton';

const mockProps = {
  classes: {
    buttonRed: 'foobar'
  },
  handleDelete: jest.fn()
};

describe('<DeleteButton /> component', () => {
  testCommonComponentAttrs(DeleteButton, mockProps);
});
