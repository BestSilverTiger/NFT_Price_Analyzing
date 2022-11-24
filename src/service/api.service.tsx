import Axios from "axios";
import { apiConfig } from "../config/api.config";

const localLink = apiConfig.localserver;
const devLink = apiConfig.devServer;

const getListedNFTs = async (nfttype: string, filter: string, page: Number) => {
  return Axios.get(`${localLink}/listednfts/${nfttype}/${filter}/${page}`);
};

const getFurthestNFTs = async (nfttype: string, page: Number) => {
  return Axios.get(
    `${localLink}/listednfts/furthest/${nfttype}/${page}/floorprice`
  );
};

const getSaleHistory = async (token_id: string, nfttype: string) => {
  return Axios.get(`${localLink}/listednfts/${nfttype}/${token_id}`);
};

const getCollectionStats = async (nfttype: string) => {
  return Axios.get(`${localLink}/listednfts/stats/${nfttype}`);
};

const getTokenById = async (nfttype: string, tokenId: string) => {
  return Axios.get(`${localLink}/listednfts/token/${nfttype}/${tokenId}/token`);
};

const ApiService = {
  getListedNFTs,
  getSaleHistory,
  getCollectionStats,
  getFurthestNFTs,
  getTokenById,
};

export default ApiService;
