import Axios from "axios";
import { apiConfig } from "../config/api.config";

const localLink = apiConfig.localserver;

const getListedBoredApeYC = async () => {
  return Axios.get(`${localLink}/boredapeyc/getListedBoredApeYC`);
};

const ApiService = {
  getListedBoredApeYC,
};

export default ApiService;
