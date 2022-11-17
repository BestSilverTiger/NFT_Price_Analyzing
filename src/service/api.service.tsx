import Axios from "axios";
import { apiConfig } from "../config/api.config";

const localLink = apiConfig.localserver;

const getListedNFTs = async (nfttype: string) => {
  return Axios.get(`${localLink}/listednfts/${nfttype}`);
};

const ApiService = {
  getListedNFTs,
};

export default ApiService;
