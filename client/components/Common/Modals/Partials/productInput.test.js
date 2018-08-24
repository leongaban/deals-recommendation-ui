// Test utils
import { testCommonComponentAttrs } from 'utils/tests';

// Components
import ProductInput from './productInput';

const mockProps = {
  id: 'foo',
  val: 'bar',
  handler: jest.fn(),
  edit: false
};

describe('<ProductInput /> component', () => {
  testCommonComponentAttrs(ProductInput, mockProps);
});
