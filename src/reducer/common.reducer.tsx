import { createSlice, isAnyOf, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ICommonState } from "../type";
import { RootState } from "../store";
import CoinMarketCapService from "../service/coinmarketcap.service";

let initialState: ICommonState = {
  nfttype: "boredapeyc",
  currentPage: 1,
  nftModalOpen: false,
  selectedNFT: "0",
  etherPrice: 0,
};

export const getEtherPrice = createAsyncThunk("stats", async () => {
  const { data } = await CoinMarketCapService.getEtherPrice();
  return data;
});

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
  extraReducers: (builder) => {
    builder.addCase(getEtherPrice.pending, (state) => {});
    builder.addCase(getEtherPrice.fulfilled, (state, { payload }) => {
      state.etherPrice = payload["ETH"]["quote"]["USD"]["price"];
    });
    builder.addCase(getEtherPrice.rejected, (state) => {});
  },
});

export const { updateCommonState } = commonSlice.actions;

export const commonState = (state: RootState) => state.common;

export default commonSlice.reducer;
