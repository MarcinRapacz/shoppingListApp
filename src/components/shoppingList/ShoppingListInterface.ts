import mongoose from "mongoose";

export interface IResponse {
  message: string;
  list?: ShoppingListInterface[];
  shoppingList?: ShoppingListInterface;
}

export interface IRequestShoppingListBody {
  name: string;
  status: string;
}

export interface ShoppingListInterface extends mongoose.Document {
  name: string;
  members: mongoose.Schema.Types.ObjectId[];
  products: { name: string; status: string }[];
  status: string;
}

export type TypeRequestShoppingListParams = {
  id: string;
};
