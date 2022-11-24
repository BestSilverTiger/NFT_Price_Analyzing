import { createSlice, isAnyOf, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState, store } from "../store";
import { INFTListState, IListedNFT, ITrait } from "../type";
import ApiService from "../service/api.service";

let initialState: INFTListState = {
  selectedNFT: 1183,
};

export const nftlistSlice = createSlice({
  name: "nftlist",
  initialState,
  reducers: {
    updateNftlistState: (state: INFTListState, action: PayloadAction<any>) => {
      let keys = Object.keys(action.payload);
      keys.forEach((key) => {
        state[key as keyof INFTListState] = action.payload[key];
      });
    },
  },
  extraReducers: (builder) => {},
});

export const { updateNftlistState } = nftlistSlice.actions;

export const nftlistState = (state: RootState) => state.nftlist;

export default nftlistSlice.reducer;
