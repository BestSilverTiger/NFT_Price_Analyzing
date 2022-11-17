import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ICommonState } from "../type/common.type";
import { RootState } from "../store";

let initialState: ICommonState = {
  nfttype: "boredapeyc",
  currentPage: 1,
};

export const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    updateCommonState: (state: ICommonState, action: PayloadAction<any>) => {
      let keys = Object.keys(action.payload);
      keys.forEach((key) => {
        state[key as keyof ICommonState] = action.payload[key];
      });
    },
  },
  extraReducers: (builder) => {},
});

export const { updateCommonState } = commonSlice.actions;

export const commonState = (state: RootState) => state.common;

export default commonSlice.reducer;
