// Test utils
import { testCommonComponentAttrs } from 'utils/tests';

// Components
import ContentSection from 'components/Layout/contentSection';

const mockProps = {
  classes: {
    paperDefault: 'paperDefault'
  },
  children: 'children'
};

describe('<ContentSection /> component', () => {
  testCommonComponentAttrs(ContentSection, mockProps);
});
