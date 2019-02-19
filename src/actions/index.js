import { FETCH_DATA, CHANGE_USER_ACC_BTC, GET_USER_ACC } from "./types";
import api from "../api";

export const fetchData = () => async dispatch => {
  const response = await api.get("");
  dispatch({
    type: FETCH_DATA,
    payload: response.data
  });
};

export const changeUserBTC = val => async dispatch => {
  dispatch({
    type: CHANGE_USER_ACC_BTC,
    payload: val
  });
};

export const getUserAcc = () => async dispatch => {
  dispatch({
    type: GET_USER_ACC
  });
};
