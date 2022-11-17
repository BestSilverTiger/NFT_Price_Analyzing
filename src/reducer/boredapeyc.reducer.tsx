import { createSlice, isAnyOf, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { IBoredApeYCState, IListedNFT } from "../type";
import ApiService from "../service/api.service";
import boredApeMetadata from "../constant/metadata/boredapeyc.json";

let initialState: IBoredApeYCState = {
  allListedBoredApeYC: [],
  getAllListedBoredApeYCLoading: false,
};

export const getAllListedBoredApeYC = createAsyncThunk(
  "boredapeyc/getListedBoredApeYC",
  async () => {
    const { data } = await ApiService.getListedBoredApeYC();
    return data;
  }
);

export const boredapeycSlice = createSlice({
  name: "boredpaeyc",
  initialState,
  reducers: {
    updateBoredApeYCState: (
      state: IBoredApeYCState,
      action: PayloadAction<any>
    ) => {
      let keys = Object.keys(action.payload);
      keys.forEach((key) => {
        state[key as keyof IBoredApeYCState] = action.payload[key];
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllListedBoredApeYC.pending, (state) => {});
    builder.addCase(getAllListedBoredApeYC.fulfilled, (state, { payload }) => {
      if (payload.success) {
        const allListedApeRes = payload.data;
        state.allListedBoredApeYC = [];
        for (let i = 0; i < allListedApeRes.length; i++) {
          const token_id = allListedApeRes[i].token_id;
          const price = allListedApeRes[i].price;
          //   @ts-ignore
          const traits = boredApeMetadata[token_id].attributes;
          state.allListedBoredApeYC.push({
            token_id: token_id,
            price: price,
            traits: traits,
          });
        }
      }
    });
    builder.addCase(getAllListedBoredApeYC.rejected, (state) => {});
  },
});

export const { updateBoredApeYCState } = boredapeycSlice.actions;

export const boredpaeycState = (state: RootState) => state.boredapeyc;

export default boredapeycSlice.reducer;
