import Axios from "axios";
import { apiConfig } from "../config/api.config";

const localLink = apiConfig.localserver;
const devLink = apiConfig.devServer;

const getListedNFTs = async (nfttype: string, filter: string, page: Number) => {
  console.log(page);
  return Axios.get(`${localLink}/listednfts/${nfttype}/${filter}/${page}`);
};

const getSaleHistory = async (token_id: string, nfttype: string) => {
  return Axios.get(`${localLink}/listednfts/${nfttype}/${token_id}`);
};

const getCollectionStats = async (nfttype: string) => {
  return Axios.get(`${localLink}/listednfts/stats/${nfttype}`);
};

const ApiService = {
  getListedNFTs,
  getSaleHistory,
  getCollectionStats,
};

export default ApiService;
