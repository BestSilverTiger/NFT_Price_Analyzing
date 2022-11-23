export interface IToken {
  token_id: String;
  price: {
    opensea: ITokenPrice;
    looksrare: ITokenPrice;
  };
  traits: ITrait[];
  salesHistory: ITokenPrice[];
}

export interface ITrait {
  type: String;
  value: String;
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
