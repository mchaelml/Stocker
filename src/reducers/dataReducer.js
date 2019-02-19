import { FETCH_DATA } from "../actions/types";

export default (state = {}, action) => {
  const { payload } = action;
  switch (action.type) {
    case FETCH_DATA:
      return { ...state, payload };
    default:
      return state;
  }
};
