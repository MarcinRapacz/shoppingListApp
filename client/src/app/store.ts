import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";

import authReducer from "../features/auth/authSlice";
import { IAuth } from "../features/auth/IAuth";

import alertReducer from "../features/alert/alertSlice";
import { IAlert } from "../features/alert/IAlert";

import loaderReducer from "../features/loader/loaderSlice";
import { ILoader } from "../features/loader/ILoader";

export interface IStore {
  auth: IAuth;
  alert: IAlert;
  loader: ILoader;
}

export const store = configureStore({
  reducer: {
    alert: alertReducer,
    auth: authReducer,
    counter: counterReducer,
    loader: loaderReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
