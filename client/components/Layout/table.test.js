// Test utils
import { testCommonComponentAttrs, testDispatchToProps } from 'utils/tests';

// Constants
import { LIFT } from 'copy/Components/tableHeader';

// Components
import { TableJest, mapDispatchToProps } from 'components/Layout/table';

const mockUpdateRules = jest.fn(() => Promise.resolve());

jest.mock('actions/Rules', () => ({
  updateRules: () => mockUpdateRules()
}));

const mockProps = {
  list: [],
  rulesSort: LIFT,
  updateRules: mockUpdateRules
};

describe('<TableJest /> component', () => {
  testCommonComponentAttrs(TableJest, mockProps);
  testDispatchToProps(TableJest, mapDispatchToProps);
});
