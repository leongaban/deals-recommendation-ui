import { testCommonComponentAttrs } from 'utils/tests';

import { ProductModalJest } from './productModal';

const jestfn = jest.fn(() => Promise.resolve());
const mockCloseModal = jestfn;
const mockUpdateRules = jestfn;
const mockToggleNotification = jestfn;

jest.mock('actions/Modals', () => ({
  closeModal: () => mockCloseModal()
}));

const mockProps = {
  classes: {
    root: { display: 'flex' },
    group: { flexDirection: 'row' },
    button: { borderRadius: '20px' },
    buttonRed: {
      color: '#fff',
      backgroundColor: '#f44336'
    },
    buttonBlue: {
      color: '#2c6fc9',
      backgroundColor: '#fff'
    }
  },
  checked: 'Default',
  rulesAll: [],
  rulesDefault: [],
  rulesOverride: [],
  rulesExcluded: [],
  rulesSort: 'Lift',
  closeModal: mockCloseModal,
  updateRules: mockUpdateRules,
  toggleNotification: mockToggleNotification
};

describe('<ProductModalJest /> component', () => {
  testCommonComponentAttrs(ProductModalJest, mockProps);
});
