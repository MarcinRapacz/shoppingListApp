import mongoose from "mongoose";
import { IProduct } from "../product/IProduct";

export interface IResponse {
  message: string;
  list?: ShoppingListInterface[];
  shoppingList?: ShoppingListInterface;
}

export interface IRequestShoppingListBody {
  name: string;
  status: string;
}

export interface IRequestMemberBody {
  email: string;
}

export interface ShoppingListInterface extends mongoose.Document {
  name: string;
  members: mongoose.Schema.Types.ObjectId[];
  products: IProduct[];
  status: string;
}

export type TypeRequestShoppingListParams = {
  id: string;
};
