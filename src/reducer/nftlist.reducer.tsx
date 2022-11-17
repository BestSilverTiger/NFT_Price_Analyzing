import { createSlice, isAnyOf, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { INFTListState, IListedNFT } from "../type";
import ApiService from "../service/api.service";
import boredApeMetadata from "../constant/metadata/boredapeyc.json";

let initialState: INFTListState = {
  allListedNFTs: [],
  getAllListedNFTsLoading: false,
};

export const getAllListedNFTs = createAsyncThunk(
  "listednfts",
  async (nfttype: string) => {
    const { data } = await ApiService.getListedNFTs(nfttype);
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
        const allListedApeRes = payload.data;
        state.allListedNFTs = [];
        for (let i = 0; i < allListedApeRes.length; i++) {
          const token_id = allListedApeRes[i].token_id;
          const price = allListedApeRes[i].price;
          //   @ts-ignore
          const traits = boredApeMetadata[token_id].attributes;
          //   @ts-ignore
          const img = boredApeMetadata[token_id].image.split("//");

          state.allListedNFTs.push({
            token_id: token_id,
            price: price,
            traits: traits,
            img: `https://ipfs.io/ipfs/${img[1]}`,
          });
        }
      }
    });
    builder.addCase(getAllListedNFTs.rejected, (state) => {});
  },
});

export const { updateNftlistState } = nftlistSlice.actions;

export const nftlistState = (state: RootState) => state.nftlist;

export default nftlistSlice.reducer;
