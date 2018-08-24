import { testCommonComponentAttrs, testDispatchToProps } from 'utils/tests';

import { TableContainerJest, mapDispatchToProps } from './tableContainer';

const mockGetRulesList = jest.fn(() => Promise.resolve());

jest.mock('actions/Rules', () => ({
  getRules: () => mockGetRulesList()
}));

const mockProps = {
  classes: {
    root: 'root'
  },
  getRules: mockGetRulesList,
  rulesAll: [],
  rulesOverride: [],
  rulesDefault: [],
  rulesExcluded: []
};

describe('<TableContainerJest /> component', () => {
  testCommonComponentAttrs(TableContainerJest, mockProps);
  testDispatchToProps(TableContainerJest, mapDispatchToProps);
});
