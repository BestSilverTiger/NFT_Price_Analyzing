export interface IListedNFT {
  collection_name: String;
  token_id: String;
  order: IOrder[];
  traits: ITrait[];
  sale_history: IOrder[];
}

export interface IListedNFT2 {
  collection_name: String;
  token_id: String;
  order: IOrder[];
  traits: ITrait1[];
  sale_history: IOrder[];
}

export interface IListedNFT1 {
  collection_name: String;
  token_id: String;
  order: IOrder[];
  traits: ITrait[];
  sale_history: IOrder[];
  floor_price: Number;
  floor_price_token: String;
  floor_price_token_price: Number;
}

export interface IOrder {
  price: Number;
  created_date: Date;
  marketplace: String;
  payment_token: String;
  payment_token_price: Number;
}

export interface ITrait {
  trait_type: String;
  trait_value: String;
}

export interface ITrait1 {
  trait_type: String;
  trait_value: String;
  floor_price: Number;
}

export interface INFTListState {
  selectedNFT: Number;
}
