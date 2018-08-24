// Test utils
import { testCommonComponentAttrs } from 'utils/tests';

// Components
import Required from './required';

const mockProps = {
  id: 'foo'
};

describe('<Required /> component', () => {
  testCommonComponentAttrs(Required, mockProps);
});
