import axios from "axios";

export const setToken = (token: string) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export const resetToken = () => {
  axios.defaults.headers.common["Authorization"] = null;
};
