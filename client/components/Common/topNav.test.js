// Test utils
import { testCommonComponentAttrs } from 'utils/tests';

// Components
import { TopNavJest } from './topNav';

const mockProps = {
  classes: {
    flex: 'flex',
    menuButton: 'menuButton'
  }
};

describe('<TopNavJest /> component', () => {
  testCommonComponentAttrs(TopNavJest, mockProps);
});
