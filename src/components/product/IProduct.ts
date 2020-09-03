import mongoose from "mongoose";

export interface IResponse {
  message: string;
  list?: IProduct[];
  product?: IProduct;
}

export interface IRequestProductBody {
  name: string;
  status: string;
  shoppingListId: mongoose.Schema.Types.ObjectId;
}

export interface IProduct extends mongoose.Document {
  name: string;
  status: string;
}

export type TypeRequestProductParams = {
  id: string;
};
