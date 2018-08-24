// Test utils
import { testCommonComponentAttrs } from 'utils/tests';

// Components
import TdDescription from 'components/Layout/contentSection';

const mockProps = {
  rule: {
    description: 'foo',
    base: 'bar',
    class: 'baz',
    prod: 'qux'
  }
};

describe('<TdDescription /> component', () => {
  testCommonComponentAttrs(TdDescription, mockProps);
});
