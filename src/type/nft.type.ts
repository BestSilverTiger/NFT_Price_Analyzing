import { ITrait } from "./trait.type";

export interface IListedNFT {
  token_id: string;
  price: number;
  traits: ITrait[];
}
