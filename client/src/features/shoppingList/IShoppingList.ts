import { IProduct } from "../product/IProduct";
import { IMember } from "../member/IMember";

export interface IShoppingList {
  name: string;
  createdAt: string;
  members: IMember[];
  products: IProduct[];
  status: string;
  updatedAt: string;
  _id: string;
}
