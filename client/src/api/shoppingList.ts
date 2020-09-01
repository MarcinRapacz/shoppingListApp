import axios from "axios";
import { IShoppingList } from "../features/shoppingList/IShoppingList";

export interface Request {
  name?: string;
  status?: string;
}

export interface ResponseSingle {
  message: string;
  shoppingList: IShoppingList;
}

export interface ResponseList {
  message: string;
  list: IShoppingList[];
}

export const URL = "/shoppingList";

export const get = (id: string) => axios.get<ResponseSingle>(`${URL}/${id}`);

export const list = () => axios.get<ResponseList>(URL);

export const create = (data: Request) => axios.post<ResponseSingle>(URL, data);

export const update = (id: string, data: Request) =>
  axios.put<ResponseSingle>(`${URL}/${id}`, data);
