import { combineReducers } from "redux";

import counter from "@redux/slices/counter";
import toggle from "@redux/slices/toggle";
import shoppinglist from "@redux/slices/shoppinglist";


const rootReducer = combineReducers({ counter,toggle,shoppinglist });

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
