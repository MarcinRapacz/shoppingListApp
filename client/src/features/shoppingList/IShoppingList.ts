import { IProduct } from "../product/IProduct";

export interface IShoppingList {
  name: string;
  createdAt: string;
  members: string[];
  products: IProduct[];
  status: string;
  updatedAt: string;
  _id: string;
}
