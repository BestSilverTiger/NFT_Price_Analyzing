import { createSlice, isAnyOf, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState, store } from "../store";
import { INFTListState, IListedNFT, ITrait } from "../type";
import ApiService from "../service/api.service";
import boredApeMetadata from "../constant/metadata/boredapeyc.json";
import { traits } from "../config/common.config";

let initialState: INFTListState = {
  allListedNFTs: [],
  getAllListedNFTsLoading: false,
  collectionStats: {
    one_hour_volume: 0,
    one_hour_change: 0,
    one_hour_sales: 0,
    one_hour_sales_change: 0,
    one_hour_average_price: 0,
    one_hour_difference: 0,
    six_hour_volume: 0,
    six_hour_change: 0,
    six_hour_sales: 0,
    six_hour_sales_change: 0,
    six_hour_average_price: 0,
    six_hour_difference: 0,
    one_day_volume: 0,
    one_day_change: 0,
    one_day_sales: 0,
    one_day_sales_change: 0,
    one_day_average_price: 0,
    one_day_difference: 0,
    seven_day_volume: 0,
    seven_day_change: 0,
    seven_day_sales: 0,
    seven_day_average_price: 0,
    seven_day_difference: 0,
    thirty_day_volume: 0,
    thirty_day_change: 0,
    thirty_day_sales: 0,
    thirty_day_average_price: 0,
    thirty_day_difference: 0,
    total_volume: 0,
    total_sales: 0,
    total_supply: 0,
    count: 0,
    num_owners: 0,
    average_price: 0,
    num_reports: 0,
    market_cap: 0,
    floor_price: 0,
  },
};

// export const getAllListedNFTs = createAsyncThunk(
//   "listednfts",
//   async (nfttype: string) => {
//     const { data } = await ApiService.getListedNFTs(nfttype);
//     return data;
//   }
// );

export const getCollectionStats = createAsyncThunk(
  "stats",
  async ({ nfttype }: { nfttype: string }) => {
    const { data } = await ApiService.getCollectionStats(nfttype);
    return data;
  }
);

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
  extraReducers: (builder) => {
    // builder.addCase(getAllListedNFTs.pending, (state) => {});
    // builder.addCase(getAllListedNFTs.fulfilled, (state, { payload }) => {
    //   if (payload.status) {
    //     state.allListedNFTs = [];
    //     for (let i = 0; i < payload.data.length; i++) {
    //       state.allListedNFTs.push({
    //         token_id: payload.data[i].token_id,
    //         price: payload.data[i].price,
    //         trait: boredApeMetadata[payload.data[i].token_id],
    //         salesHistory: payload.data[i].salesHistory,
    //       });
    //     }
    //   }
    //   state.getAllListedNFTsLoading = false;
    // });
    // builder.addCase(getAllListedNFTs.rejected, (state) => {});
    builder.addCase(getCollectionStats.pending, (state) => {});
    builder.addCase(getCollectionStats.fulfilled, (state, { payload }) => {
      if (payload.status) {
        const res = payload.data;
        state.collectionStats.floor_price = Math.min(
          res.opensea.floor_price,
          res.looksrare.floorPrice
        );
      }
    });
    builder.addCase(getCollectionStats.rejected, (state) => {});
  },
});

export const { updateNftlistState } = nftlistSlice.actions;

export const nftlistState = (state: RootState) => state.nftlist;

export default nftlistSlice.reducer;
