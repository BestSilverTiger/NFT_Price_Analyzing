import { createSlice, isAnyOf, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { INFTListState, IListedNFT, ITrait } from "../type";
import { commonState } from "./common.reducer";
import ApiService from "../service/api.service";
import boredApeMetadata from "../constant/metadata/boredapeyc.json";
import { traits } from "../config/common.config";

let initialState: INFTListState = {
  allListedNFTs: [],
  getAllListedNFTsLoading: false,
  priceHistory: [],
};

export const getAllListedNFTs = createAsyncThunk(
  "listednfts",
  async (nfttype: string) => {
    const { data } = await ApiService.getListedNFTs(nfttype);
    return data;
  }
);

export const getSaleHistory = createAsyncThunk(
  "getSalehistory",
  async ({ token_id, nfttype }: { token_id: string; nfttype: string }) => {
    console.log(token_id);
    const { data } = await ApiService.getSaleHistory(token_id, nfttype);
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
    builder.addCase(getAllListedNFTs.pending, (state) => {});
    builder.addCase(getAllListedNFTs.fulfilled, (state, { payload }) => {
      if (payload.status) {
        const allListedNFTsRes = payload.data;
        state.allListedNFTs = [];
        for (let i = 0; i < allListedNFTsRes.length; i++) {
          const token_id = allListedNFTsRes[i].token_id;
          const price = allListedNFTsRes[i].price;
          if (price < 1 / 10 ** 5) {
            continue;
          }
          //   @ts-ignore
          let trait_list = traits[state.nfttype];
          //   @ts-ignore
          const token_traits = boredApeMetadata[token_id];
          let token_traits_temp = [];
          for (let j = 0; j < token_traits.length; j++) {
            let type = token_traits[j].trait_type;
            let value = token_traits[j].value.toLowerCase();
            token_traits_temp.push({
              type: type,
              value: token_traits[j].value,
            });
          }
          state.allListedNFTs.push({
            token_id: token_id,
            price: price,
            traits: token_traits_temp,
          });
        }
      }
    });
    builder.addCase(getAllListedNFTs.rejected, (state) => {});
    builder.addCase(getSaleHistory.pending, (state) => {});
    builder.addCase(getSaleHistory.fulfilled, (state, { payload }) => {
      if (payload.status) {
        state.priceHistory = payload.data;
        console.log(payload.data);
      }
    });
    builder.addCase(getSaleHistory.rejected, (state) => {});
  },
});

export const { updateNftlistState } = nftlistSlice.actions;

export const nftlistState = (state: RootState) => state.nftlist;

export default nftlistSlice.reducer;
