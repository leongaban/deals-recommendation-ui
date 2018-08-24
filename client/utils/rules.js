/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */

// Ramda
import all from 'ramda/src/all';

// utils/common
import {
  isArrayEmpty,
  isEmptyString,
  isUndefined
} from 'utils/common';

// Add the type key.
export const addType = (type) => {
  switch (type) {
    case 'O': return 'Override';
    case 'E': return 'Exclude';
    case 'D':
    default: return 'Default';
  }
};

export const getArrayType = (type) => {
  switch (type) {
    case 'O':
      return 'override';
    case 'D':
      return 'default';
    default:
      return null;
  }
};

// Updates the rules enabled & checked keys.
export const cleanList = (list = []) => list.map((item) => {
  if (!item.enabled) item.enabled = false;
  item.checked = addType(item.type);
  return item;
});

// Concats all the rule arrays together.
export const concatAll = (
  defaults = [],
  override = [],
  exclude = []
) => cleanList(defaults.concat(override).concat(exclude));

// Sort array by rank.
const byRank = (b, a) => b.rank - a.rank;

// Concat, cleanLists and return all Rules arrays.
export const organizeRules = ({
  sortRule,
  override,
  default: defaults,
  exclude
}) => ({
  sortRule,
  all: concatAll(override, defaults, exclude),
  override: cleanList(override).sort(byRank),
  default: cleanList(defaults).sort(byRank),
  exclude: cleanList(exclude)
});

const isD = i => i === 'D';
const isO = i => i === 'O';

/**
 * Finds out what list type we are working with (What tab we are on).
 * Function creates a new array containing all the rule.type keys.
 * We then check if the Array is all D's or all O's or a mix.
 * @param {!Array} list A list of rules
 * @return {string} 'default' or 'override' or null if neither.
 */
export const findListType = (list) => {
  const types = list.map(i => i.type);
  const defaultList = all(isD)(types);
  const overrideList = all(isO)(types);

  if (defaultList) {
    return 'default';
  } else if (overrideList) {
    return 'override';
  }

  return null;
};

/**
 * When a rule is moved to a new list (Override/Default).
 * That rule's rank should be updated by the new list's length + 1.
 * @param {string} type of list
 * @param {Array} Default list
 * @param {Array} Override list
 * @param {string} currentRank
 * @return {number} New rank or currentRank
 */
const updateRank = (type, dList, oList, currentRank) => {
  if (type === 'Default') {
    return dList.length + 1;
  } else if (type === 'Override') {
    return oList.length + 1;
  }
  return currentRank;
};

// Update remaining Rules ranks.
export const updateRanks = (rank, filteredList) =>
  filteredList.map((i) => {
    if (i.rank > parseInt(rank, 10)) {
      i.rank--;
    }
    return i;
  });

// Find and edit rule's type.
export const changeRuleType = ({
  listType,
  list,
  type,
  rank,
  rulesSort,
  ruleID,
  dList,
  oList
}) => {
  const rule = list.filter(l => l.ruleID === ruleID).pop();
  rule.checked = type;
  rule.type = type.charAt(0);
  rule.rank = updateRank(type, dList, oList, rule.rank);

  const canChangeRank = listType === 'override' || listType === 'default';

  // If changing type to Override or Default, then update ranks
  // in both lists.
  if (canChangeRank) {
    const currentList = listType === 'override' ? oList : dList;
    const filteredList = currentList.filter(i => i.ruleID !== ruleID);
    return {
      sortRule: rulesSort,
      [type.toLowerCase()]: [{
        ...rule
      }],
      [listType]: updateRanks(rank, filteredList)
    };
  }

  // If changing type in All or Exluded.
  return {
    sortRule: rulesSort,
    [type.toLowerCase()]: [{
      ...rule
    }]
  };
};

// Find and edit rule's enabled status.
export const changeEnabledStatus = (list, rulesSort, ruleID) => {
  const rule = list.filter(l => l.ruleID === ruleID).pop();
  const type = rule.checked.toLowerCase();
  rule.enabled = !rule.enabled;

  return {
    sortRule: rulesSort,
    [type]: [{
      ...rule
    }]
  };
};

// Formats re-ranked list to be PUT ready.
export const changedRanks = (type, list, rulesSort) => ({
  sortRule: rulesSort,
  [type]: list
});

// Checks if value is not an empty string.
const isDefined = v => !isEmptyString(v);

// Validation for the New Product Modal form.
export const validProductForm = ({
  description, classId
}) => all(isDefined)([description, classId]);

// Set's a Product Rule's Rank during creation.
export const setRank = (type, lists) => {
  const list = lists[type.toLowerCase()];
  if (isArrayEmpty(list) || isUndefined(list)) {
    return 1;
  }

  return list.length + 1;
};

// Find the rule's parent list.
export const pluckRules = (type, overrides, defaults) => {
  switch (type) {
    case 'O': return overrides;
    case 'D': return defaults;
    default: return [];
  }
};

// Filter out items that are enabled.
const filterEnabledLists = (dList, oList, eList) => {
  const enabledOverride = oList.filter(i => i.enabled === true);
  const enabledDefaults = dList.filter(i => i.enabled === true);
  const enabledExcluded = eList.filter(i => i.enabled === true);

  return {
    enabledOverride,
    enabledDefaults,
    enabledExcluded
  };
};

// Check if the list has met it's limit for enabled items.
export const checkLimits = (type, dList, oList, eList) => {
  const filtered = filterEnabledLists(dList, oList, eList);

  switch (type) {
    case 'O': return filtered.enabledOverride.length < 4;
    case 'D': return filtered.enabledDefaults.length < 8;
    case 'E': return filtered.enabledExcluded.length < 8;
    default:
      return false;
  }
};

export const checkSubmitable = (listNotFull, enabled) => {
  const listIsFull = !listNotFull;
  const isEnabled = enabled === true;

  if (listNotFull) {
    return true;
  } else if (listIsFull && !isEnabled) {
    return true;
  }
  return false;
};
