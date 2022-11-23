import Axios from "axios";
import { apiConfig } from "../config/api.config";
import { nftCollection } from "../config/common.config";
import CoinMarketCap from "coinmarketcap-api";
const apiKey = "0e66f142-e699-4828-8adf-888015cf3781";

const client = new CoinMarketCap(apiKey);

const server = apiConfig.coinmarketcapServer;

const getEtherPrice = async () => {
  return client.getQuotes({ symbol: "ETH", convert: "USD" });
};

const CoinMarketCapService = { getEtherPrice };

export default CoinMarketCapService;
