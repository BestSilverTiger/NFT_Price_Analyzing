import Axios from "axios";
import { apiConfig } from "../config/api.config";
import { nftCollection } from "../config/common.config";
const api_key = process.env.OPENSEA_API_KEY;
const apiServer1 = apiConfig.openseaServer1;
const apiServer2 = apiConfig.openseaServer2;

const getCollectionStats = async (nfttype: string) => {
  return Axios.get(
    `${apiServer1}/collection/${nftCollection[nfttype].collection_slug}/stats`,
    {
      headers: {
        "X-API-KEY": api_key,
      },
    }
  );
};

const OpenSeaService = { getCollectionStats };

export default OpenSeaService;
