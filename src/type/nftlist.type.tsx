export interface IListedNFT {
  token_id: string;
  price: number;
  img: string;
  traits: ITrait[];
}

export interface ITrait {
  type: String;
  value: String;
}

export interface INFTListState {
  allListedNFTs: IListedNFT[];
  getAllListedNFTsLoading: boolean;
}
