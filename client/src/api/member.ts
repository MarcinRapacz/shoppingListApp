import axios from "axios";

export interface Request {
  email: string;
}

export interface Response {
  message: string;
}

export const URL = "/shoppingList";

export const toggle = (shoppingListId: string, data: Request) =>
  axios.post<Response>(`${URL}/${shoppingListId}/toggleMember`, data);
