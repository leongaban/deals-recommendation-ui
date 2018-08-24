/* eslint-disable object-curly-newline */

// Util functions
import {
  addType,
  cleanList,
  concatAll,
  changeRuleType
} from './rules';

const mockListWithNoEnabled = [
  { type: 'D' }
];

const mockListWithEnabled = [
  { type: 'D', enabled: true }
];

const defaults = [{
  ruleID: 'foo',
  type: 'D',
  enabled: true,
  rank: 1
}];

const override = [{
  type: 'O',
  enabled: true,
  rank: 1
}];

const exclude = [{
  type: 'E',
  enabled: true,
  rank: 1
}];

const combinedArray = [
  { checked: 'Default', enabled: true, ruleID: 'foo', type: 'D', rank: 1 },
  { checked: 'Override', enabled: true, type: 'O', rank: 1 },
  { checked: 'Exclude', enabled: true, type: 'E', rank: 1 }
];

const ruleTypeAnswer = {
  override: [{ checked: 'override', enabled: true, rank: 1, ruleID: 'foo', type: 'o' }], sortRule: 'WeightedLift'
};

describe('Rules util > addType', () => {
  it('should return Default if type is D', () => {
    const result = addType('D');
    expect(result).toEqual('Default');
  });

  it('should return Override if type is O', () => {
    const result = addType('O');
    expect(result).toEqual('Override');
  });

  it('should return Exclude if type is E', () => {
    const result = addType('E');
    expect(result).toEqual('Exclude');
  });
});

describe('Rules util > cleanList', () => {
  it('should return a list with an object with the key enabled: false', () => {
    const result = cleanList(mockListWithNoEnabled);
    expect(result).toEqual([{ checked: 'Default', enabled: false, type: 'D' }]);
  });

  it('should return a list with an object with the key enabled: true', () => {
    const result = cleanList(mockListWithEnabled);
    expect(result).toEqual([{ checked: 'Default', enabled: true, type: 'D' }]);
  });
});

describe('Rules util > concatAll', () => {
  it('should return a combined Array', () => {
    const result = concatAll(defaults, override, exclude);
    expect(result).toEqual(combinedArray);
  });
});

describe('Rules util > changeRuleType', () => {
  it('should return a rules object with a rule converted from default to override', () => {
    const rulePackage = {
      listType: 'defaults',
      list: defaults,
      type: 'override',
      rank: 1,
      rulesSort: 'WeightedLift',
      ruleID: 'foo',
      dList: defaults,
      oList: override
    };

    const result = changeRuleType(rulePackage);
    expect(result).toEqual(ruleTypeAnswer);
  });
});
