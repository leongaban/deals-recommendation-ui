// Test utils
import { testCommonComponentAttrs, testDispatchToProps } from 'utils/tests';

// Components
import { ProductsJest, mapDispatchToProps } from './products';

const mockProps = {
  setModal: jest.fn()
};

describe('<ProductsJest /> component', () => {
  testCommonComponentAttrs(ProductsJest, mockProps);
  testDispatchToProps(ProductsJest, mapDispatchToProps);
});
