import { testCommonComponentAttrs, testDispatchToProps } from 'utils/tests';

import { DeleteModalJest, mapDispatchToProps } from './deleteModal';

const mockCloseModal = jest.fn(() => Promise.resolve());
const mockDeleteRules = jest.fn(() => Promise.resolve());
const mockToggleNotification = jest.fn(() => Promise.resolve());

jest.mock('actions/Modals', () => ({
  closeModal: () => mockCloseModal()
}));

const mockProps = {
  classes: {
    root: { display: 'flex' }
  },
  rulesSort: 'Lift',
  closeModal: mockCloseModal,
  deleteRule: mockDeleteRules,
  toggleNotification: mockToggleNotification
};

describe('<DeleteModalJest /> component', () => {
  testCommonComponentAttrs(DeleteModalJest, mockProps);
  testDispatchToProps(DeleteModalJest, mapDispatchToProps);
});
