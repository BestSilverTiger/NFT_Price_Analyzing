import Axios from "axios";
import { apiConfig } from "../config/api.config";
import { nftCollection } from "../config/common.config";
const api_key = process.env.OPENSEA_API_KEY;
const apiServer = apiConfig.looksrareServer;

const getCollectionStats = async (nfttype: string) => {
  return Axios.get(
    `${apiServer}/collections/stats?address=${nftCollection[nfttype].contractAddress}`
  );
};

const LooksrareService = { getCollectionStats };

export default LooksrareService;
