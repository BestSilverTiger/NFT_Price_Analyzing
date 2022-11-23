import Axios from "axios";
import { apiConfig } from "../config/api.config";
import { nftCollection } from "../config/common.config";
const server = apiConfig.coingeckoServer;

const getCollectionStats = async (nft_id: String) => {
  return Axios.get(`${server}/nfts/${nft_id}`);
};

const CoinGeckoService = { getCollectionStats };

export default CoinGeckoService;
