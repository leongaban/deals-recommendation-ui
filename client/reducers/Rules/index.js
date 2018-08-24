import {
  SET_ALL_RULES,
  SHOW_RULES_LOADING
} from 'actions/types';

export const initialState = {
  rulesLoading: false,
  rulesSort: 'Lift',
  rulesAll: [],
  rulesOverride: [],
  rulesDefault: [],
  rulesExcluded: []
};

const rulesReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_ALL_RULES:
      return {
        ...state,
        rulesLoading: false,
        rulesSort: payload.sortRule,
        rulesAll: payload.all,
        rulesOverride: payload.override,
        rulesDefault: payload.default,
        rulesExcluded: payload.exclude
      };
    case SHOW_RULES_LOADING:
      return {
        ...state,
        rulesLoading: true
      };
    default:
      return state;
  }
};

export default rulesReducer;
