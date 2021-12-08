import { combineReducers } from "redux";

import counter from "@redux/slices/counter";
import toggle from "@redux/slices/toggle";
import shoppinglist from "@redux/slices/shoppinglist";
import itemCounter from "./slices/itemCounter";

const rootReducer = combineReducers({
  counter,
  toggle,
  shoppinglist,
  itemCounter,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
