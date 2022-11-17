import { IListedNFT } from "../type";
import ApiService from "./api.service";
import { AppDispatch } from "../store";
import { updateBoredApeYCState } from "../reducer/boredapeyc.reducer";
import BoredApeYCMetaData from "../constant/metadata/boredapeyc.json";

// export const getAllListedBoredApeYC = async (dispactch: AppDispatch) => {
//   dispactch(updateBoredApeYCState({ getAllListedBoredApeYCLoading: true }));
//   try {
//     const allListedApeRes = await ApiService.getListedBoredApeYC();
//     let allListedApeTemp: IListedNFT[] = [];
//     for (let i = 0; i < allListedApeRes.length; i++)
//   } catch (e) {
//     console.log(e);
//   }
// };
