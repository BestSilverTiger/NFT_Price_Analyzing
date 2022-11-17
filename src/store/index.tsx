import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import MainReducer from "../reducer";
const store = configureStore({
  reducer: MainReducer,
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = ThunkDispatch<{}, {}, any>;

export const AppSelector: TypedUseSelectorHook<RootState> = useSelector;
