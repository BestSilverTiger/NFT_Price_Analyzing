export interface IListedNFT {
  token_id: String;
  price: {
    opensea: ITokenPrice;
    looksrare: ITokenPrice;
  };
  trait: ITrait[];
  salesHistory: ITokenPrice[];
}

export interface ITokenPrice {
  price: Number;
  created_date: String;
  payment_token: String;
  payment_token_price: Number;
}

export interface ISaleHistory {
  price: Number;
  marketplace: String;
  date: String;
  token_type: String;
  token_price: Number;
}

export interface ITrait {
  type: String;
  value: String;
}

export interface INFTListState {
  allListedNFTs: IListedNFT[];
  getAllListedNFTsLoading: boolean;
  collectionStats: ICollectionStats;
}

export interface ICollectionStats {
  one_hour_volume: Number;
  one_hour_change: Number;
  one_hour_sales: Number;
  one_hour_sales_change: Number;
  one_hour_average_price: Number;
  one_hour_difference: Number;
  six_hour_volume: Number;
  six_hour_change: Number;
  six_hour_sales: Number;
  six_hour_sales_change: Number;
  six_hour_average_price: Number;
  six_hour_difference: Number;
  one_day_volume: Number;
  one_day_change: Number;
  one_day_sales: Number;
  one_day_sales_change: Number;
  one_day_average_price: Number;
  one_day_difference: Number;
  seven_day_volume: Number;
  seven_day_change: Number;
  seven_day_sales: Number;
  seven_day_average_price: Number;
  seven_day_difference: Number;
  thirty_day_volume: Number;
  thirty_day_change: Number;
  thirty_day_sales: Number;
  thirty_day_average_price: Number;
  thirty_day_difference: Number;
  total_volume: Number;
  total_sales: Number;
  total_supply: Number;
  count: Number;
  num_owners: Number;
  average_price: Number;
  num_reports: Number;
  market_cap: Number;
  floor_price: Number;
}
