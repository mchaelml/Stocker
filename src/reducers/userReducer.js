import { CHANGE_USER_ACC_BTC, GET_USER_ACC } from "../actions/types";

export default (state = { amount: 100 }, action) => {
  const { payload } = action;
  switch (action.type) {
    case CHANGE_USER_ACC_BTC:
      return { ...state, amount: state.amount + payload };
    case GET_USER_ACC:
      return state;
    default:
      return state;
  }
};
