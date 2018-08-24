// Test utils
import { testCommonComponentAttrs } from 'utils/tests';

// Components
import { RightMenuJest } from 'components/Menus/rightMenu';

const mockLogout = jest.fn(() => Promise.resolve());

jest.mock('actions/Auth', () => ({
  logout: () => mockLogout()
}));

const mockProps = {
  authed: true,
  logout: mockLogout
};

describe('<RightMenuJest /> component', () => {
  testCommonComponentAttrs(RightMenuJest, mockProps);
});
