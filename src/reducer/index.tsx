import { combineReducers } from "@reduxjs/toolkit";
import boredapeycReducer from "./boredapeyc.reducer";

const MainReducer = combineReducers({
  boredapeyc: boredapeycReducer,
});

export default MainReducer;
