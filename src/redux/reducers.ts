import { combineReducers } from "redux";

import counter from "@redux/slices/counter";
import toggle from "@redux/slices/toggle";

const rootReducer = combineReducers({ counter,toggle });

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
