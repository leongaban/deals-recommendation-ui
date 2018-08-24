// Utils
import { makeRequest, defaultCatch } from 'utils/services';
import { organizeRules } from 'utils/rules';

// Action Types
import {
  SET_ALL_RULES,
  SHOW_RULES_LOADING
} from 'actions/types';

/**
 * Retrieves a list of rules.
 * @return {Promise} Resolved with a Rules List.
 */
export const callGetRules = () =>
  makeRequest('/rules', 'GET')
    .catch(defaultCatch('callGetRules'));

/**
 * Updates a rule.
 * @return {Promise} Resolved with a Rules List.
 */
export const callPutRules = rules =>
  makeRequest('/rules', 'PUT', rules)
    .catch(defaultCatch('callPutRules'));

/**
 * Deletes a rule.
 * @return {Promise} Resolved with a Rules List.
 */
export const callDeleteRule = ruleID =>
  makeRequest(`/rules/${ruleID}`, 'DELETE')
    .catch(defaultCatch('callDeleteRule'));

/**
 * Updates the sortRule (Lift or WeightedLift).
 * @return {Promise} Resolved with a Rules List.
 */
export const callChangeSortRule = sortRule =>
  makeRequest('/rules', 'PUT', sortRule)
    .catch(defaultCatch('callChangeSortRule'));

// GET and set all product lists.
export const getRules = () => dispatch => callGetRules()
  .then((r) => {
    const { data } = r;
    return organizeRules(data);
  })
  .then(payload => ({ type: SET_ALL_RULES, payload }))
  .then(dispatch);

// PUT/UPDATE a rule.
export const updateRules = rules => (dispatch) => {
  dispatch({ type: SHOW_RULES_LOADING });
  return callPutRules(rules)
    .then((r) => {
      const { data } = r;
      return organizeRules(data);
    })
    .then(payload => ({ type: SET_ALL_RULES, payload }))
    .then(dispatch);
};

// PUT/UPDATE the sortRule.
export const updateSortRule = sortRule => (dispatch) => {
  dispatch({ type: SHOW_RULES_LOADING });
  return callPutRules(sortRule)
    .then((r) => {
      const { data } = r;
      return organizeRules(data);
    })
    .then(payload => ({ type: SET_ALL_RULES, payload }))
    .then(dispatch);
};

// DELETE a rule.
export const deleteRule = ruleID => (dispatch) => {
  dispatch({ type: SHOW_RULES_LOADING });
  return callDeleteRule(ruleID)
    .then(() => getRules())
    .then(dispatch);
};
