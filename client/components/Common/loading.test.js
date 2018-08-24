// Test utils
import { testCommonComponentAttrs } from 'utils/tests';

// Components
import CircularIndeterminate from 'components/Common/loading';

const mockProps = {
  classes: {
    progress: 'foo',
    loadingWrapper: 'bar'
  }
};

describe('<CircularIndeterminate /> component', () => {
  testCommonComponentAttrs(CircularIndeterminate, mockProps);
});
