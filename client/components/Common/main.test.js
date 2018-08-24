// Test utils
import { testCommonComponentAttrs } from 'utils/tests';

// Components
import { MainJest } from 'components/Common/main';

const mockProps = {
  classes: {
    root: {
      flexGrow: 1,
      display: 'flex',
      flexDirection: 'column',
      height: '100%'
    }
  }
};

describe('<MainJest /> component', () => {
  testCommonComponentAttrs(MainJest, mockProps);
});
