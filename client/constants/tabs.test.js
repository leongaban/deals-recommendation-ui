// Components
import { TABS_DEFINITIONS } from './tabs';

describe('TABS_DEFINITIONS', () => {
  describe('Tab 1 definition', () => {
    it('should have a label equal to All Products', () => {
      expect(TABS_DEFINITIONS[0].label).toEqual('All Products');
    });
  });

  describe('Tab 2 definition', () => {
    it('should have a label equal to All Override', () => {
      expect(TABS_DEFINITIONS[1].label).toEqual('Override');
    });
  });

  describe('Tab 3 definition', () => {
    it('should have a label equal to All Default', () => {
      expect(TABS_DEFINITIONS[2].label).toEqual('Default');
    });
  });

  describe('Tab 4 definition', () => {
    it('should have a label equal to All Excluded', () => {
      expect(TABS_DEFINITIONS[3].label).toEqual('Excluded');
    });
  });
});
