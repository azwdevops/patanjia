import { combineReducers } from "redux";

import auth from "./auth";
import shared from "./shared";
import search from "./search";

export default combineReducers({
  auth,
  shared,
  search,
});
