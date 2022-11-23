import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import MainReducer from "../reducer";
export const store = configureStore({
  reducer: MainReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = ThunkDispatch<{}, {}, any>;

export const AppSelector: TypedUseSelectorHook<RootState> = useSelector;
