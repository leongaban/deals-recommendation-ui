// Test utils
import { testCommonComponentAttrs } from 'utils/tests';

// Components
import ProductsTabContainer from 'components/Layout/productsTabContainer';

const mockProps = {
  value: 0
};

describe('<ProductsTabContainer /> component', () => {
  testCommonComponentAttrs(ProductsTabContainer, mockProps);
});
