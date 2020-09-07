import axios from "axios";
import { IProduct } from "../features/product/IProduct";

export interface Request {
  shoppingListId?: string;
  name?: string;
  status?: string;
}

export interface ResponseSingle {
  message: string;
  product: IProduct;
}

export interface ResponseList {
  message: string;
  list: IProduct[];
}

export const URL = "/product";

export const create = (data: Request) => axios.post<ResponseSingle>(URL, data);

export const update = (id: string, data: Request) =>
  axios.put<ResponseSingle>(`${URL}/${id}`, data);

export const remove = (id: string) => axios.delete(`${URL}/${id}`);
