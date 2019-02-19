import { combineReducers } from "redux";
import dataReducer from "./dataReducer";
import { reducer as formReducer } from "redux-form";
import userReducer from "./userReducer";

export default combineReducers({
  data: dataReducer,
  form: formReducer,
  user: userReducer
});
