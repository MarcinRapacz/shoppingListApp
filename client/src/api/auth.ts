import axios from "axios";

export interface Request {
  email: string;
  password: string;
}

export interface Response {
  token: string;
  message: string;
}

export const login = (data: Request) =>
  axios.post<Response>("/auth/login", data);

export const create = (data: Request) =>
  axios.post<Response>("/auth/create", data);

export const facebook = (data: {
  id: string;
  accessToken: string;
  signedRequest: string;
}) => axios.post<Response>(`/auth/facebook`, data);

export const google = (data: { idToken: string }) =>
  axios.post<Response>(`/auth/google`, data);
