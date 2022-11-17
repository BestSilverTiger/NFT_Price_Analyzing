import { combineReducers } from "@reduxjs/toolkit";
import nftlistReducer from "./nftlist.reducer";
import commonReducer from "./common.reducer";

const MainReducer = combineReducers({
  nftlist: nftlistReducer,
  common: commonReducer,
});

export default MainReducer;
