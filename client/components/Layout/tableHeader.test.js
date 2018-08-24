// Test utils
import { testCommonComponentAttrs } from 'utils/tests';

// Constants
import { LIFT } from 'copy/Components/tableHeader';

// Components
import { TableHeaderJest } from 'components/Layout/tableHeader';

const mockUpdateSortRule = jest.fn(() => Promise.resolve());

jest.mock('actions/Rules', () => ({
  updateSortRule: () => mockUpdateSortRule()
}));

const mockProps = {
  classes: {
    root: 'root'
  },
  getRules: mockUpdateSortRule,
  rulesDefault: [],
  rulesOverride: [],
  rulesExcluded: [],
  rulesSort: LIFT
};

describe('<TableHeaderJest /> component', () => {
  testCommonComponentAttrs(TableHeaderJest, mockProps);
});
