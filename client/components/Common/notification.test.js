// Test utils
import { testCommonComponentAttrs } from 'utils/tests';

// Components
import Notification from 'components/Common/notification';

const mockProps = {
  className: 'random-class-name',
  open: true,
  message: 'Hello World!'
};

describe('<Notification /> component', () => {
  testCommonComponentAttrs(Notification, mockProps);
});
