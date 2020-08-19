import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAuth } from "./IAuth";
import * as localStorageTools from "../../tools/localStorage";
import { JWT } from "../../tools/jsonWebToken";
import * as axiosTools from "../../tools/axios";

const initialState: IAuth = {
  isAuth: false,
  id: "",
  email: "",
  photoURL: "",
  iat: 0,
  exp: 0,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    set: (state, action: PayloadAction<string>) => {
      const token = action.payload;
      const decodedToken = JWT.decode(token);

      if (decodedToken?.exp * 1000 > Date.now()) {
        state.isAuth = true;
        state.email = decodedToken.email;
        state.id = decodedToken.id;
        state.photoURL = decodedToken.photoURL;
        state.iat = decodedToken.iat;
        state.exp = decodedToken.exp;

        axiosTools.setToken(token);
        localStorageTools.setToken(token);
      } else {
        axiosTools.resetToken();
        localStorageTools.resetToken();
      }
    },
    reset: (state) => {
      state.isAuth = false;
      state.email = "";
      state.id = "";
      state.photoURL = "";
      state.iat = 0;
      state.exp = 0;

      axiosTools.resetToken();
      localStorageTools.resetToken();
    },
  },
});

export const { set, reset } = authSlice.actions;

export default authSlice.reducer;
