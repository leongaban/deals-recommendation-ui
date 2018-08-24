// Test utils
import { testCommonComponentAttrs } from 'utils/tests';

// Components
import { RouteInterceptorJest } from './routeInterceptor';

let mockSaveRedirect;

describe('<RouteInterceptor /> component', () => {
  testCommonComponentAttrs(RouteInterceptorJest);

  beforeEach(() => {
    mockSaveRedirect = jest.fn();
  });

  describe('when logged in', () => {
    it('should NOT save the redirect path', () => {
      expect(mockSaveRedirect).not.toHaveBeenCalled();
    });
  });
});
