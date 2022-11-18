export interface IListedNFT {
  token_id: string;
  price: number;
  traits: ITrait[];
}

export interface ITrait {
  type: String;
  value: String;
}

export interface INFTListState {
  allListedNFTs: IListedNFT[];
  getAllListedNFTsLoading: boolean;
  priceHistory: IPriceHistory[];
}

export interface IPriceHistory {
  date: String;
  price: Number;
  token_type: String;
}
